// Keep production startup independent of development-only CLI packages.
process.env.NODE_ENV = "production";
await import("../dist/index.js");
