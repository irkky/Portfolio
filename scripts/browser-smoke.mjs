import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createServer } from "node:net";
import WebSocket from "ws";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function until(fn, message) {
  for (let i = 0; i < 100; i++) {
    try { const result = await fn(); if (result) return result; } catch {}
    await delay(100);
  }
  throw new Error(message);
}
const portProbe = createServer();
await new Promise(resolve => portProbe.listen(0, "127.0.0.1", resolve));
const port = portProbe.address().port;
await new Promise(resolve => portProbe.close(resolve));
const origin = `http://127.0.0.1:${port}`;
const profile = await mkdtemp(join(tmpdir(), "portfolio-browser-"));
const { devDependencies } = JSON.parse(await readFile("package.json", "utf8"));
const loader = `export async function resolve(specifier, context, nextResolve) {
  const forbidden = ${JSON.stringify(Object.keys(devDependencies))};
  if (forbidden.some(name => specifier === name || specifier.startsWith(name + '/'))) {
    throw new Error('Production imported a development dependency: ' + specifier);
  }
  return nextResolve(specifier, context);
}`;
const register = `import { register } from 'node:module'; register(${JSON.stringify(`data:text/javascript,${encodeURIComponent(loader)}`)}, import.meta.url);`;
const server = spawn(process.execPath, ["--import", `data:text/javascript,${encodeURIComponent(register)}`, "scripts/start.mjs"], {
  env: { ...process.env, PORT: String(port) }, windowsHide: true, stdio: "pipe",
});
const browser = spawn(process.env.BROWSER_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
  "--headless=new", "--no-first-run", "--no-default-browser-check", "--remote-debugging-port=0",
  `--user-data-dir=${profile}`, "--enable-unsafe-swiftshader", "about:blank",
], { windowsHide: true, stdio: "ignore" });
let socket;
let passed = 0;
const failures = [];
server.on("error", error => failures.push(error.message));
server.stderr.on("data", data => process.stderr.write(data));
browser.on("error", error => failures.push(error.message));
try {
  await until(async () => (await fetch(origin)).ok, "Production server did not start");
  const browserPort = await until(async () => (await readFile(join(profile, "DevToolsActivePort"), "utf8")).split("\n")[0], "Browser did not start");
  const pages = await (await fetch(`http://127.0.0.1:${browserPort}/json/list`)).json();
  socket = new WebSocket(pages.find(page => page.type === "page").webSocketDebuggerUrl);
  await new Promise(resolve => socket.once("open", resolve));
  let id = 0;
  const pending = new Map();
  socket.on("message", data => {
    const message = JSON.parse(data);
    if (message.id) {
      const entry = pending.get(message.id);
      pending.delete(message.id);
      message.error ? entry.reject(new Error(message.error.message)) : entry.resolve(message.result);
    } else if (message.method === "Runtime.exceptionThrown") {
      failures.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
    }
  });
  const call = (method, params = {}) => new Promise((resolve, reject) => {
    pending.set(++id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async expression => {
    const result = await call("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
    return result.result.value;
  };
  const check = async (expression, label) => {
    assert.equal(await evaluate(expression), true, label);
    passed++;
    console.log(`PASS ${label}`);
  };
  const navigate = async (path, text) => {
    await call("Page.navigate", { url: origin + path });
    await until(() => evaluate(`location.pathname === ${JSON.stringify(path)} && document.body.innerText.includes(${JSON.stringify(text)})`), `Page failed: ${path}`);
    await delay(600);
  };
  await call("Runtime.enable");
  await call("Page.enable");
  await call("Emulation.setDeviceMetricsOverride", { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
  await navigate("/", "Hi, I'm");
  await check(`!document.querySelector('a button')`, "Home actions use single links");
  await evaluate(`document.querySelector('nav a[href="/projects"]').focus()`);
  await call("Input.dispatchKeyEvent", { type: "keyDown", key: " ", code: "Space", windowsVirtualKeyCode: 32 });
  await call("Input.dispatchKeyEvent", { type: "keyUp", key: " ", code: "Space", windowsVirtualKeyCode: 32 });
  await check(`location.pathname === '/' && document.querySelector('nav a[aria-current="page"]').getAttribute('href') === '/'`, "Space does not select a different route");
  await check(`getComputedStyle(document.activeElement).outlineStyle !== 'none'`, "Keyboard focus is visible");
  await call("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
  await call("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
  await until(() => evaluate(`location.pathname === '/projects' && !!document.querySelector('article')`), "Enter did not navigate");
  passed++; console.log("PASS Enter navigates through lazy route");
  await evaluate(`Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Web Apps')).click()`);
  await until(() => evaluate(`document.querySelectorAll('article').length === 1`), "Project filter failed");
  passed++; console.log("PASS Project category filtering");
  await evaluate(`Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('All Projects')).click(); document.querySelector('#project-search').focus()`);
  await call("Input.insertText", { text: "LegalMate" });
  await until(() => evaluate(`document.querySelectorAll('article').length === 1 && document.querySelector('article').textContent.includes('LegalMate')`), "Project search failed");
  passed++; console.log("PASS Project text search");
  for (const [width, height] of [[1280,800], [375,600], [320,480]]) {
    await call("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
    await evaluate(`document.querySelector('article').focus(); document.querySelector('article').click()`);
    await until(() => evaluate(`!!document.querySelector('[role="dialog"]')`), "Dialog did not open");
    await delay(400);
    await check(`document.body.style.overflow === 'hidden'`, `Background locked at ${width}`);
    await check(`(() => { const d = document.querySelector('[role="dialog"]'); const r = d.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight && getComputedStyle(d).overflowY === 'auto'; })()`, `Dialog fits and scrolls at ${width}`);
    await check(`document.activeElement.getAttribute('aria-label') === 'Close project details'`, `Dialog receives focus at ${width}`);
    await call("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9, modifiers: 8 });
    await check(`document.activeElement === document.querySelector('[role="dialog"] a:last-child')`, `Shift-Tab stays inside dialog at ${width}`);
    await call("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    await check(`document.activeElement.getAttribute('aria-label') === 'Close project details'`, `Tab wraps to dialog close at ${width}`);
    await call("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
    await until(() => evaluate(`!document.querySelector('[role="dialog"]')`), "Dialog exit did not finish");
    await check(`!document.querySelector('[role="dialog"]') && document.body.style.overflow === '' && document.activeElement.matches('article')`, `Escape restores scroll and focus at ${width}`);
  }
  await navigate("/profile", "My Journey");
  await check(`getComputedStyle(document.querySelector('.pc-card-wrapper')).touchAction.includes('pan-y')`, "Profile allows vertical touch scrolling");
  await navigate("/missing-page", "404 Page Not Found");
  await check(`getComputedStyle(document.querySelector('main h1')).color === getComputedStyle(document.querySelector('main')).color`, "404 heading uses readable theme color");
  const fallback = await call("Page.addScriptToEvaluateOnNewDocument", { source: `HTMLCanvasElement.prototype.getContext = () => null;` });
  await navigate("/", "Hi, I'm");
  await check(`!!document.querySelector('a[href="/projects"]')`, "Home survives unavailable WebGL");
  await call("Page.removeScriptToEvaluateOnNewDocument", { identifier: fallback.identifier });
  const graphicsProbe = await call("Page.addScriptToEvaluateOnNewDocument", { source: `
    window.graphics = { allocations: 0, live: new Set(), pending: new Map(), duplicateFrames: false };
    const originalContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(...args) {
      const gl = originalContext.apply(this, args);
      if (!gl || gl.__tracked) return gl;
      gl.__tracked = true;
      const draw = gl.drawElements.bind(gl);
      gl.drawElements = (...values) => { graphics.renderCallback = graphics.currentCallback; return draw(...values); };
      for (const kind of ['Texture', 'Framebuffer', 'Buffer', 'Shader', 'Program']) {
        const create = gl['create' + kind].bind(gl);
        const remove = gl['delete' + kind].bind(gl);
        gl['create' + kind] = (...values) => {
          const resource = create(...values);
          if (resource) { graphics.allocations++; graphics.live.add(resource); }
          return resource;
        };
        gl['delete' + kind] = resource => { graphics.live.delete(resource); return remove(resource); };
      }
      return gl;
    };
    const originalFrame = requestAnimationFrame;
    const originalCancel = cancelAnimationFrame;
    window.requestAnimationFrame = callback => {
      if ([...graphics.pending.values()].includes(callback)) graphics.duplicateFrames = true;
      const id = originalFrame(time => {
        graphics.pending.delete(id);
        graphics.currentCallback = callback;
        try { callback(time); } finally { graphics.currentCallback = null; }
      });
      graphics.pending.set(id, callback);
      return id;
    };
    window.cancelAnimationFrame = id => { graphics.pending.delete(id); originalCancel(id); };
  ` });
  await navigate("/", "Hi, I'm");
  await check(`graphics.allocations > 0 && graphics.live.size > 0`, "WebGL effect initializes with supported graphics");
  await evaluate(`document.body.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 50, clientY: 50 }));`);
  await delay(200);
  await evaluate(`(() => { const event = new Event('touchstart', { bubbles: true }); Object.defineProperty(event, 'targetTouches', { value: [{ identifier: 0, clientX: 50, clientY: 50 }, { identifier: 1, clientX: 80, clientY: 80 }] }); document.body.dispatchEvent(event); })()`);
  await delay(300);
  await check(`!graphics.duplicateFrames`, "Mouse plus multi-touch starts only one animation loop");
  await evaluate(`window.liveBeforeResize = graphics.live.size`);
  await call("Emulation.setDeviceMetricsOverride", { width: 375, height: 600, deviceScaleFactor: 1, mobile: false });
  await delay(400);
  await check(`graphics.live.size === window.liveBeforeResize`, "Resizing replaces old graphics resources without leaking");
  await evaluate(`document.querySelector('a[href="/projects"]').click()`);
  await until(() => evaluate(`location.pathname === '/projects' && !!document.querySelector('article')`), "Navigation after graphics failed");
  await check(`graphics.live.size === 0`, "Leaving Home releases all WebGL resources");
  await check(`!!graphics.renderCallback && ![...graphics.pending.values()].includes(graphics.renderCallback)`, "Leaving Home cancels the graphics animation frame");
  await call("Page.removeScriptToEvaluateOnNewDocument", { identifier: graphicsProbe.identifier });
  const unsupported = await call("Page.addScriptToEvaluateOnNewDocument", { source: `
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(...args) {
      const gl = original.apply(this, args);
      if (gl) gl.checkFramebufferStatus = () => gl.FRAMEBUFFER_UNSUPPORTED;
      return gl;
    };
  ` });
  await navigate("/", "Hi, I'm");
  await check(`!!document.querySelector('a[href="/projects"]')`, "Home survives unsupported texture formats");
  await call("Page.removeScriptToEvaluateOnNewDocument", { identifier: unsupported.identifier });
  await call("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  const reduced = await call("Page.addScriptToEvaluateOnNewDocument", { source: `window.contextCalls = 0; const original = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function(...args) { window.contextCalls++; return original.apply(this,args); };` });
  await navigate("/", "Hi, I'm");
  await check(`window.contextCalls === 0 && getComputedStyle(document.documentElement).scrollBehavior === 'auto'`, "Reduced motion skips WebGL and smooth scrolling");
  await evaluate(`window.lastScroll = null; window.scrollTo = options => { window.lastScroll = options; }; document.querySelector('[aria-label="Scroll to featured statistics"]').click()`);
  await check(`window.lastScroll.behavior === 'auto'`, "Scroll button respects reduced motion");
  await call("Page.removeScriptToEvaluateOnNewDocument", { identifier: reduced.identifier });
  await call("Emulation.setEmulatedMedia", { features: [] });
  for (const [path, text] of [["/skills", "Skills & Expertise"], ["/activities", "Beyond"], ["/contact", "Get In Touch"]]) {
    await navigate(path, text);
    passed++; console.log(`PASS Lazy page ${path}`);
  }
  await evaluate(`document.querySelector('button[title="Copy Email"]').click()`);
  await until(() => evaluate(`!!document.querySelector('[aria-label="Dismiss notification"]')`), "Contact copy action did not show a toast");
  await check(`!!document.querySelector('button[aria-label="Dismiss notification"]')`, "Contact notification has a named close control");
  assert.deepEqual(failures, [], "Browser/server runtime errors");
  console.log(`${passed} browser checks passed; no uncaught runtime errors.`);
} finally {
  socket?.close();
  browser.kill();
  server.kill();
}
