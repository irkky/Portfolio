import Galaxy from "./Galaxy";

interface GalaxyDemoProps {
  variant?: "hero" | "subtle" | "intense" | "custom";
  className?: string;
}

export default function GalaxyDemo({ variant = "hero", className = "" }: GalaxyDemoProps) {
  const configurations = {
    hero: {
      density: 0.8,
      starSpeed: 0.3,
      hueShift: 200,
      glowIntensity: 0.4,
      twinkleIntensity: 0.5,
      rotationSpeed: 0.05,
      mouseInteraction: true,
      mouseRepulsion: true,
      repulsionStrength: 1.5,
      transparent: true,
    },
    subtle: {
      density: 0.5,
      starSpeed: 0.1,
      hueShift: 180,
      glowIntensity: 0.2,
      twinkleIntensity: 0.3,
      rotationSpeed: 0.02,
      mouseInteraction: false,
      mouseRepulsion: false,
      repulsionStrength: 0,
      transparent: true,
    },
    intense: {
      density: 1.2,
      starSpeed: 0.8,
      hueShift: 240,
      glowIntensity: 0.6,
      twinkleIntensity: 0.7,
      rotationSpeed: 0.15,
      mouseInteraction: true,
      mouseRepulsion: true,
      repulsionStrength: 2.5,
      transparent: true,
    },
    custom: {
      density: 1.0,
      starSpeed: 0.4,
      hueShift: 160,
      glowIntensity: 0.5,
      twinkleIntensity: 0.4,
      rotationSpeed: 0.08,
      mouseInteraction: true,
      mouseRepulsion: true,
      repulsionStrength: 1.8,
      transparent: true,
    },
  };

  const config = configurations[variant];

  return (
    <div className={`w-full h-full relative ${className}`}>
      <Galaxy {...config} />
    </div>
  );
}