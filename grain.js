/* Orbit design system: grain.js
   Turns every .o-gg element into a grainy-gradient surface.
   - Injects 5 blobs, an optional white line pattern, a cursor glow, and a grain canvas.
   - Grain: 128x128 grey noise tile, values 128 +/- 70, overlay at 0.4, 1 noise px = 1 physical px.
   - Hover: spring (stiffness 70, damping ratio 0.86) on wrapper layers. Blobs move ~9% toward
     the cursor, the pattern ~3% the other way, a soft glow fades in.
   - Respects prefers-reduced-motion.
   Options (data attributes on .o-gg):
     data-gg-pattern="contours" | "rays" | "none"   (default "none")
     data-gg-hover="off"                             (disable cursor motion)
   API: window.OrbitGG.init(el), window.OrbitGG.initAll(root) */
(function () {
  "use strict";
  var root = document.documentElement;
  function token(name, fallback) {
    var v = parseFloat(getComputedStyle(root).getPropertyValue(name));
    return isNaN(v) ? fallback : v;
  }
  var reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  var tile = null;
  function getTile() {
    if (tile) return tile;
    var amp = token("--o-gg-grain-amp", 70);
    tile = document.createElement("canvas");
    tile.width = tile.height = 128;
    var c = tile.getContext("2d"), img = c.createImageData(128, 128);
    for (var i = 0; i < img.data.length; i += 4) {
      var v = (128 + (Math.random() - 0.5) * 2 * amp) | 0;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    c.putImageData(img, 0, 0);
    return tile;
  }

  function contours() {
    var s = "", cx = 50, cy = 46;
    for (var k = 1; k <= 26; k++) {
      var r = k * 4.2, d = "";
      for (var a = 0; a <= Math.PI * 2 + 0.01; a += Math.PI / 72) {
        var rr = r * (1 + 0.03 * Math.sin(a * 3 + k * 0.5) + 0.018 * Math.sin(a * 5 - k));
        d += (d ? "L" : "M") + (cx + Math.cos(a) * rr * 1.25).toFixed(2) + " " + (cy + Math.sin(a) * rr * 0.95).toFixed(2);
      }
      s += '<path d="' + d + 'Z" fill="none" stroke="#fff" stroke-width="0.8"/>';
    }
    return s;
  }
  function rays() {
    // origin well below the surface, so lines do not bunch into a busy point
    var s = "", ox = 50, oy = 170;
    for (var i = 0; i <= 36; i++) {
      var ang = -Math.PI / 2 + (i - 18) * (Math.PI / 80);
      var x = ox + Math.cos(ang) * 260, y = oy + Math.sin(ang) * 260;
      s += '<path d="M' + ox + " " + oy + "L" + x.toFixed(2) + " " + y.toFixed(2) + '" stroke="#fff" stroke-width="0.8"/>';
    }
    return s;
  }
  var PATTERNS = { contours: contours, rays: rays };

  function layer(cls, tag) {
    var el = document.createElement(tag || "div");
    el.className = "o-gg__layer " + cls;
    el.setAttribute("aria-hidden", "true");
    return el;
  }

  function init(el) {
    if (!el || el.__orbitGG) return;
    el.__orbitGG = true;

    var blobs = el.querySelector(":scope > .o-gg__blobs");
    if (!blobs) {
      blobs = layer("o-gg__blobs");
      for (var b = 1; b <= 5; b++) {
        var blob = document.createElement("div");
        blob.className = "o-gg__blob o-gg__blob--" + b;
        blobs.appendChild(blob);
      }
    }
    var pattern = layer("o-gg__pattern");
    var glow = layer("o-gg__glow");
    var grain = layer("o-gg__grain", "canvas");
    var kind = el.getAttribute("data-gg-pattern") || "none";
    if (PATTERNS[kind]) {
      pattern.innerHTML = '<svg viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">' + PATTERNS[kind]() + "</svg>";
    }
    el.prepend(blobs, pattern, glow, grain);

    function paintGrain() {
      var dpr = window.devicePixelRatio || 1, r = el.getBoundingClientRect();
      var w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
      if (grain.width === w && grain.height === h) return;
      grain.width = w; grain.height = h;
      var c = grain.getContext("2d");
      c.imageSmoothingEnabled = false;
      c.fillStyle = c.createPattern(getTile(), "repeat");
      c.fillRect(0, 0, w, h);
    }
    paintGrain();
    if ("ResizeObserver" in window) new ResizeObserver(paintGrain).observe(el);
    else window.addEventListener("resize", paintGrain);

    if (el.getAttribute("data-gg-hover") === "off") return;

    var K = token("--o-spring-stiffness", 70);
    var C = 2 * token("--o-spring-damping", 0.86) * Math.sqrt(K);
    var BLOB = token("--o-hover-blob-shift", 9), PAT = token("--o-hover-pattern-shift", 3);
    function mk() { return { x: 0, v: 0, t: 0 }; }
    var sx = mk(), sy = mk(), sg = mk(), raf = 0, last = 0;
    function step(s, dt) { var a = -K * (s.x - s.t) - C * s.v; s.v += a * dt; s.x += s.v * dt; }
    function rest(s) { return Math.abs(s.v) < 1e-4 && Math.abs(s.x - s.t) < 1e-4; }
    function kick() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } }
    function tick(now) {
      var dt = Math.min(0.05, (now - last) / 1000); last = now;
      for (var i = 0; i < 4; i++) { step(sx, dt / 4); step(sy, dt / 4); step(sg, dt / 4); }
      blobs.style.transform = "translate(" + (sx.x * BLOB).toFixed(3) + "%, " + (sy.x * BLOB).toFixed(3) + "%)";
      pattern.style.transform = "translate(" + (-sx.x * PAT).toFixed(3) + "%, " + (-sy.x * PAT).toFixed(3) + "%)";
      glow.style.opacity = Math.max(0, Math.min(1, sg.x)).toFixed(3);
      raf = rest(sx) && rest(sy) && rest(sg) ? 0 : requestAnimationFrame(tick);
    }
    el.addEventListener("pointermove", function (e) {
      if (reduceMQ.matches) return;
      var r = el.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width, ny = (e.clientY - r.top) / r.height;
      sx.t = nx - 0.5; sy.t = ny - 0.5; sg.t = 1;
      glow.style.setProperty("--gx", (nx * 100).toFixed(2) + "%");
      glow.style.setProperty("--gy", (ny * 100).toFixed(2) + "%");
      kick();
    });
    el.addEventListener("pointerleave", function () { sx.t = sy.t = sg.t = 0; kick(); });
  }

  function initAll(scope) {
    (scope || document).querySelectorAll(".o-gg").forEach(init);
  }
  window.OrbitGG = { init: init, initAll: initAll };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { initAll(); });
  else initAll();
})();
