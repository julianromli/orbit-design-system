/* Orbit design system: icons.js
   Injects one inline SVG sprite. Use: <svg class="o-ic"><use href="#i-plus"/></svg>
   Icons are 16x16, 1.5px stroke, currentColor. Load this before the body renders (in <head>). */
(function () {
  var S = {
    "orbit": '<circle cx="8" cy="8" r="3.2" fill="currentColor" stroke="none"/><ellipse cx="8" cy="8" rx="6.9" ry="3.1" fill="none" transform="rotate(-28 8 8)"/>',
    "plus": '<path d="M8 3v10M3 8h10"/>',
    "home": '<path d="M2.5 7 8 2.5 13.5 7v6.5h-11z"/><path d="M6.5 13.5V9.5h3v4"/>',
    "user": '<circle cx="8" cy="5.5" r="2.7"/><path d="M2.8 13.5c.8-2.6 2.8-3.8 5.2-3.8s4.4 1.2 5.2 3.8"/>',
    "users": '<circle cx="6" cy="5.5" r="2.4"/><path d="M1.8 13.5c.6-2.4 2.2-3.6 4.2-3.6s3.6 1.2 4.2 3.6"/><path d="M10.2 3.4a2.4 2.4 0 0 1 0 4.4M11.6 9.9c1.3.4 2.2 1.6 2.6 3.6"/>',
    "box": '<path d="M2.5 5 8 2.5 13.5 5v6L8 13.5 2.5 11z"/><path d="M2.5 5 8 7.5 13.5 5M8 7.5v6"/>',
    "target": '<circle cx="8" cy="8" r="5.5"/><circle cx="8" cy="8" r="2.5"/>',
    "chart": '<path d="M2.5 13.5h11M4.5 11V8M8 11V4.5M11.5 11V6.5"/>',
    "grid": '<rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1"/><rect x="9" y="2.5" width="4.5" height="4.5" rx="1"/><rect x="2.5" y="9" width="4.5" height="4.5" rx="1"/><rect x="9" y="9" width="4.5" height="4.5" rx="1"/>',
    "file": '<path d="M4 2.5h5l3 3v8H4z"/><path d="M9 2.5v3h3"/>',
    "layers": '<path d="M8 2.5 13.5 5.5 8 8.5 2.5 5.5z"/><path d="M2.5 8.5 8 11.5l5.5-3M2.5 11 8 14l5.5-3"/>',
    "dots": '<circle cx="4" cy="8" r=".9" fill="currentColor"/><circle cx="8" cy="8" r=".9" fill="currentColor"/><circle cx="12" cy="8" r=".9" fill="currentColor"/>',
    "chev": '<path d="m4.5 6 3.5 3.5L11.5 6"/>',
    "chev-right": '<path d="m6 4.5 3.5 3.5L6 11.5"/>',
    "search": '<circle cx="7" cy="7" r="4.5"/><path d="m10.5 10.5 3 3"/>',
    "bell": '<path d="M4 11.5V7a4 4 0 0 1 8 0v4.5l1 1H3z"/><path d="M6.5 13.5a1.5 1.5 0 0 0 3 0"/>',
    "help": '<circle cx="8" cy="8" r="5.5"/><path d="M6.4 6.3a1.7 1.7 0 0 1 3.2.6c0 1.1-1.6 1.3-1.6 2.3M8 11.2v.1"/>',
    "spark": '<path d="M8 2.5 9.3 6.7 13.5 8 9.3 9.3 8 13.5 6.7 9.3 2.5 8l4.2-1.3z"/>',
    "doc": '<path d="M3.5 3h9v10h-9z"/><path d="M5.5 6h5M5.5 8.5h5M5.5 11h3"/>',
    "inbox": '<path d="M2.5 9.5 4.5 3.5h7l2 6v3.5h-11z"/><path d="M2.5 9.5h3l1 1.5h3l1-1.5h3"/>',
    "gear": '<circle cx="8" cy="8" r="2"/><path d="M8 1.8v1.8M8 12.4v1.8M1.8 8h1.8M12.4 8h1.8M3.6 3.6l1.3 1.3M11.1 11.1l1.3 1.3M3.6 12.4l1.3-1.3M11.1 4.9l1.3-1.3"/>',
    "cal": '<rect x="2.5" y="3.5" width="11" height="10" rx="1.5"/><path d="M2.5 6.5h11M5.5 2v3M10.5 2v3"/>',
    "list": '<path d="M5.5 4h8M5.5 8h8M5.5 12h8M2.5 4h.1M2.5 8h.1M2.5 12h.1"/>',
    "board": '<rect x="2.5" y="2.5" width="11" height="11" rx="1.5"/><path d="M6.2 2.5v11M9.8 2.5v11"/>',
    "filter": '<path d="M2.5 4h11M4.5 8h7M6.5 12h3"/>',
    "sliders": '<path d="M3 4.5h10M3 11.5h10"/><circle cx="6" cy="4.5" r="1.5" fill="#fff"/><circle cx="10" cy="11.5" r="1.5" fill="#fff"/>',
    "link": '<path d="M7 9a2.5 2.5 0 0 0 3.5 0l2-2A2.5 2.5 0 0 0 9 3.5l-.7.7"/><path d="M9 7a2.5 2.5 0 0 0-3.5 0l-2 2A2.5 2.5 0 0 0 7 12.5l.7-.7"/>',
    "panel": '<rect x="2.5" y="3" width="11" height="10" rx="1.5"/><path d="M7 3v10"/>',
    "arrow": '<path d="M3 8h10M9 4l4 4-4 4"/>',
    "check": '<path d="m3.5 8.3 2.8 2.7 6.2-6.3"/>',
    "menu": '<path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11"/>',
    "x": '<path d="m4 4 8 8M12 4l-8 8"/>',
    "bolt": '<path d="M9 2 3.5 9H8l-1 5 5.5-7H8z"/>',
    "lock": '<rect x="3" y="7" width="10" height="6.5" rx="1.5"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"/>',
    "globe": '<circle cx="8" cy="8" r="5.5"/><path d="M2.5 8h11M8 2.5c1.6 1.6 2.4 3.4 2.4 5.5S9.6 11.9 8 13.5C6.4 11.9 5.6 10.1 5.6 8S6.4 4.1 8 2.5z"/>',
    "cloud": '<path d="M4.5 12.5a3 3 0 0 1-.3-6 4 4 0 0 1 7.6-.6 3.3 3.3 0 0 1 .2 6.6z"/>',
    "clock": '<circle cx="8" cy="8" r="5.5"/><path d="M8 5v3l2 1.5"/>',
    "trend": '<path d="M2.5 11 6 7.5l2.5 2.5 5-5"/><path d="M10 5h3.5v3.5"/>',
    "cycle": '<path d="M12.8 6.5A5 5 0 0 0 3.6 5.4M3.2 9.5a5 5 0 0 0 9.2 1.1"/><path d="M3.3 2.8v2.8h2.8M12.7 13.2v-2.8H9.9"/>',
    "pri-bars": '<path d="M2 8V6" style="stroke:var(--b1,currentColor)"/><path d="M5 8V4" style="stroke:var(--b2,currentColor)"/><path d="M8 8V2" style="stroke:var(--b3,currentColor)"/>',
    "pri-urgent": '<path d="M5 2v3.6M5 7.6v.1" stroke="currentColor"/>',
    "pri-sub": '<path d="M3 2v3.5a1.5 1.5 0 0 0 1.5 1.5H8" fill="none" stroke="currentColor"/>'
  };
  var small = { "pri-bars": 1, "pri-urgent": 1, "pri-sub": 1 };
  var out = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>';
  for (var k in S) out += '<symbol id="i-' + k + '" viewBox="' + (small[k] ? "0 0 10 10" : "0 0 16 16") + '">' + S[k] + "</symbol>";
  out += "</defs></svg>";
  function inject() { document.body.insertAdjacentHTML("afterbegin", out); }
  if (document.body) inject(); else document.addEventListener("DOMContentLoaded", inject);
  window.OrbitIcons = Object.keys(S);
})();
