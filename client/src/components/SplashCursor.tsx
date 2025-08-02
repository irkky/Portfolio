import React, { useCallback, useEffect, useRef } from 'react';

// WebGL Shader sources for fluid simulation
const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0, 1);
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec3 u_color;
  
  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec4 color = texture2D(u_texture, uv);
    
    // Add dynamic rainbow colors
    vec3 rainbow = vec3(
      0.5 + 0.5 * sin(u_time * 2.0 + uv.x * 10.0),
      0.5 + 0.5 * sin(u_time * 2.0 + uv.y * 10.0 + 2.0),
      0.5 + 0.5 * sin(u_time * 2.0 + (uv.x + uv.y) * 10.0 + 4.0)
    );
    
    gl_FragColor = vec4(mix(color.rgb, rainbow, color.a), color.a);
  }
`;

const splashShaderSource = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_force;
  uniform float u_radius;
  
  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 mouse = u_mouse / u_resolution.xy;
    
    float dist = distance(uv, mouse);
    float splash = 1.0 - smoothstep(0.0, u_radius, dist);
    
    // Dynamic rainbow colors based on time
    vec3 color = vec3(
      0.5 + 0.5 * sin(u_time * 3.0),
      0.5 + 0.5 * sin(u_time * 3.0 + 2.0),
      0.5 + 0.5 * sin(u_time * 3.0 + 4.0)
    );
    
    gl_FragColor = vec4(color, splash * u_force);
  }
`;

interface SplashCursorProps {
  simResolution?: number;
  dyeResolution?: number;
  densityDissipation?: number;
  velocityDissipation?: number;
  pressure?: number;
  pressureIterations?: number;
  curl?: number;
  splatRadius?: number;
  splatForce?: number;
  colorUpdateSpeed?: number;
  transparent?: boolean;
}

const SplashCursor: React.FC<SplashCursorProps> = ({
  simResolution = 128,
  dyeResolution = 1024,
  densityDissipation = 1.0,
  velocityDissipation = 0.2,
  pressure = 0.8,
  pressureIterations = 20,
  curl = 30,
  splatRadius = 0.25,
  splatForce = 6000,
  colorUpdateSpeed = 10,
  transparent = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const splashProgramRef = useRef<WebGLProgram | null>(null);
  const animationFrameRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0, down: false });
  const timeRef = useRef(0);
  const pointers = useRef<Array<{ x: number, y: number, dx: number, dy: number, down: boolean }>>([]);

  // Create shader function
  const createShader = useCallback((gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    
    return shader;
  }, []);

  // Create program function
  const createProgram = useCallback((gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null => {
    const program = gl.createProgram();
    if (!program) return null;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    
    return program;
  }, []);

  // Initialize WebGL
  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const gl = canvas.getContext('webgl', { 
      alpha: transparent,
      premultipliedAlpha: false
    });
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }
    
    glRef.current = gl;
    
    // Create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const splashFragmentShader = createShader(gl, gl.FRAGMENT_SHADER, splashShaderSource);
    
    if (!vertexShader || !fragmentShader || !splashFragmentShader) return;
    
    // Create programs
    const program = createProgram(gl, vertexShader, fragmentShader);
    const splashProgram = createProgram(gl, vertexShader, splashFragmentShader);
    
    if (!program || !splashProgram) return;
    
    programRef.current = program;
    splashProgramRef.current = splashProgram;
    
    // Create buffer for full-screen quad
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]);
    
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    
    // Setup position attribute
    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    // Enable blending for smooth effects
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    startAnimation();
  }, [createShader, createProgram, transparent]);

  // Mouse handling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const pointer = pointers.current[0] || { x: 0, y: 0, dx: 0, dy: 0, down: false };
    pointer.dx = x - pointer.x;
    pointer.dy = y - pointer.y;
    pointer.x = x;
    pointer.y = y;
    pointers.current[0] = pointer;
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (pointers.current[0]) {
      pointers.current[0].down = true;
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (pointers.current[0]) {
      pointers.current[0].down = false;
    }
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const gl = glRef.current;
    const canvas = canvasRef.current;
    const splashProgram = splashProgramRef.current;
    
    if (!gl || !canvas || !splashProgram) return;
    
    timeRef.current += 0.016; // ~60fps
    
    gl.viewport(0, 0, canvas.width, canvas.height);
    
    // Clear with transparent background
    if (transparent) {
      gl.clearColor(0, 0, 0, 0);
    } else {
      gl.clearColor(0.1, 0.1, 0.1, 1);
    }
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // Use splash program
    gl.useProgram(splashProgram);
    
    // Set uniforms
    const resolutionLocation = gl.getUniformLocation(splashProgram, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(splashProgram, 'u_mouse');
    const timeLocation = gl.getUniformLocation(splashProgram, 'u_time');
    const forceLocation = gl.getUniformLocation(splashProgram, 'u_force');
    const radiusLocation = gl.getUniformLocation(splashProgram, 'u_radius');
    
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform1f(timeLocation, timeRef.current);
    gl.uniform1f(radiusLocation, splatRadius);
    
    // Draw splashes for active pointers
    pointers.current.forEach((pointer) => {
      if (!pointer) return;
      
      const force = Math.min(Math.sqrt(pointer.dx * pointer.dx + pointer.dy * pointer.dy) / 100, 1) * splatForce;
      
      gl.uniform2f(mouseLocation, pointer.x, canvas.height - pointer.y);
      gl.uniform1f(forceLocation, force / 1000);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    });
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [splatRadius, splatForce, transparent]);

  const startAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animate();
  }, [animate]);

  // Resize handler
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    if (glRef.current) {
      glRef.current.viewport(0, 0, canvas.width, canvas.height);
    }
  }, []);

  useEffect(() => {
    // Initialize one pointer
    pointers.current = [{ x: 0, y: 0, dx: 0, dy: 0, down: false }];
    
    initWebGL();
    handleResize();
    
    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [initWebGL, handleResize, handleMouseMove, handleMouseDown, handleMouseUp]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'normal'
      }}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default SplashCursor;