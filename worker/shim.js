// Lets the site's browser scripts (window.X = ...) run inside the Worker.
globalThis.window = globalThis;
