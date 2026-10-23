/* Orbit design system: forms.js
   Small, dependency-free behaviours for Orbit forms. Load with <script src="forms.js" defer></script>.
   Everything is opt-in through classes or data attributes, so pages without forms pay nothing.

   form[data-o-validate]     Validate on submit, then live on input once a field has shown an error.
                             Errors go into the element named by the field's aria-describedby that has class o-error.
                             A valid submit fires "o:submit" on the form with detail.done(message, ok).
   textarea.o-textarea       Auto-grows (fallback for browsers without field-sizing). Cmd/Ctrl+Enter submits.
   [data-o-reveal]           Show or hide the password in the same .o-affix.
   [data-o-clear]            Clear the input in the same .o-affix and put focus back in it.
   .o-segment button         Single choice: keeps aria-pressed in sync (add data-o-manual to the segment to opt out).
   [data-o-kbd="K"]          Writes the platform shortcut: "⌘K" on Apple devices, "Ctrl K" elsewhere.
   .o-search[data-o-search]  Collapsed search button opens and focuses the input; Esc clears, then blurs.
                             data-o-shortcut="k" also opens it with Cmd/Ctrl+K.
   window.OrbitForms         { setLoading(button, on, label), setStatus(form, message, kind), validate(form) } */
(function () {
  var MAC = /Mac|iPhone|iPad|iPod/.test([(navigator.userAgentData && navigator.userAgentData.platform) || '', navigator.platform || '', navigator.userAgent || ''].join(' '));
  var ICON_ALERT = '<svg class="o-ic" aria-hidden="true"><use href="#i-alert"/></svg>';
  var ICON_CHECK = '<svg class="o-ic" aria-hidden="true"><use href="#i-check"/></svg>';

  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function on(type, sel, fn) {
    document.addEventListener(type, function (e) { var t = e.target.closest && e.target.closest(sel); if (t) fn(e, t); });
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- validation ---------- */
  function errorEl(field) {
    var ids = (field.getAttribute("aria-describedby") || "").split(/\s+/);
    for (var i = 0; i < ids.length; i++) { var el = ids[i] && document.getElementById(ids[i]); if (el && el.classList.contains("o-error")) return el; }
    return null;
  }
  function message(field) {
    var v = field.validity, d = field.dataset;
    if (v.valueMissing) return d.oMsgRequired || (field.type === "email" ? "Enter your email address." : field.type === "checkbox" ? "Check this box to continue." : "This field is required.");
    if (v.typeMismatch) return d.oMsgType || (field.type === "email" ? "Enter an email address like name@company.com." : field.type === "url" ? "Enter a full URL, starting with https://." : "Check the format.");
    if (v.tooShort) return d.oMsgShort || "Use at least " + field.minLength + " characters.";
    if (v.tooLong) return "Use " + field.maxLength + " characters or fewer.";
    if (v.patternMismatch) return d.oMsgPattern || field.title || "Check the format.";
    if (v.rangeUnderflow) return "Use " + field.min + " or more.";
    if (v.rangeOverflow) return "Use " + field.max + " or less.";
    return field.validationMessage;
  }
  function showError(field, msg) {
    var el = errorEl(field);
    if (msg) {
      field.setAttribute("aria-invalid", "true");
      if (el) el.innerHTML = ICON_ALERT + "<span>" + esc(msg) + "</span>";
    } else {
      field.removeAttribute("aria-invalid");
      if (el) el.textContent = "";
    }
  }
  function check(field) {
    if (!field.willValidate) return true;
    var ok = field.checkValidity();
    showError(field, ok ? "" : message(field));
    return ok;
  }
  function fields(form) { return $$("input, select, textarea", form).filter(function (f) { return f.willValidate && f.type !== "submit" && f.type !== "button"; }); }
  function validate(form) {
    var first = null;
    fields(form).forEach(function (f) { if (!check(f) && !first) first = f; });
    return first;
  }

  function setLoading(btn, isOn, label) {
    if (!btn) return;
    if (isOn) {
      if (!btn.dataset.oLabel) btn.dataset.oLabel = btn.innerHTML;
      btn.classList.add("is-loading");
      btn.disabled = true;
      btn.setAttribute("aria-busy", "true");
      btn.innerHTML = "<span>" + esc(label || btn.dataset.oLoading || "Sending…") + "</span>";
    } else {
      btn.classList.remove("is-loading");
      btn.disabled = false;
      btn.removeAttribute("aria-busy");
      if (btn.dataset.oLabel) { btn.innerHTML = btn.dataset.oLabel; delete btn.dataset.oLabel; }
    }
  }
  function setStatus(form, msg, kind) {
    var el = form.querySelector(".o-form-status") || (form.id && document.querySelector('.o-form-status[data-for="' + form.id + '"]'));
    if (!el) return;
    el.classList.remove("is-success", "is-error");
    if (kind) el.classList.add("is-" + kind);
    el.innerHTML = msg ? (kind === "success" ? ICON_CHECK : kind === "error" ? ICON_ALERT : "") + "<span>" + esc(msg) + "</span>" : "";
  }

  document.addEventListener("submit", function (e) {
    var form = e.target;
    if (!form.matches || !form.matches("form[data-o-validate]")) return;
    e.preventDefault();
    if (form.dataset.oBusy) return;
    setStatus(form, "");
    var bad = validate(form);
    form.dataset.oTried = "1";
    if (bad) {
      var n = fields(form).filter(function (f) { return f.getAttribute("aria-invalid") === "true"; }).length;
      setStatus(form, n > 1 ? "Fix the " + n + " fields marked in red." : "Fix the field marked in red.", "error");
      bad.focus();
      return;
    }
    var btn = e.submitter || form.querySelector('[type="submit"]');
    form.dataset.oBusy = "1";
    setLoading(btn, true);
    var finished = false;
    function done(msg, ok) {
      if (finished) return; finished = true;
      delete form.dataset.oBusy;
      setLoading(btn, false);
      setStatus(form, msg || "", ok === false ? "error" : msg ? "success" : "");
    }
    var ev = new CustomEvent("o:submit", { cancelable: true, detail: { form: form, button: btn, done: done } });
    form.dispatchEvent(ev);
    if (!ev.defaultPrevented && !form.hasAttribute("data-o-async")) done(form.dataset.oSuccess || "Saved.", true);
  });
  // Reward early, punish late: only validate on blur once there is a value; live once an error is showing.
  document.addEventListener("focusout", function (e) {
    var f = e.target;
    if (!f.form || !f.form.matches("form[data-o-validate]") || !f.willValidate) return;
    if (f.value || f.form.dataset.oTried) check(f);
  });
  document.addEventListener("input", function (e) {
    var f = e.target;
    if (f.getAttribute && f.getAttribute("aria-invalid") === "true") check(f);
  });
  document.addEventListener("change", function (e) {
    var f = e.target;
    if ((f.type === "checkbox" || f.type === "radio" || f.tagName === "SELECT") && f.form && f.form.dataset.oTried) check(f);
  });

  /* ---------- textarea: auto-grow + Cmd/Ctrl+Enter ---------- */
  var FIELD_SIZING = window.CSS && CSS.supports && CSS.supports("field-sizing", "content");
  function grow(t) { if (FIELD_SIZING) return; t.style.height = "auto"; t.style.height = t.scrollHeight + 2 + "px"; }
  on("input", "textarea.o-textarea", function (e, t) { grow(t); });
  on("keydown", "textarea.o-textarea", function (e, t) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && t.form) { e.preventDefault(); t.form.requestSubmit(); }
  });

  /* ---------- password show/hide, clear ---------- */
  on("click", "[data-o-reveal]", function (e, b) {
    var input = b.closest(".o-affix").querySelector("input");
    var show = input.type === "password";
    input.type = show ? "text" : "password";
    b.setAttribute("aria-pressed", show ? "true" : "false");
  });
  on("click", "[data-o-clear]", function (e, b) {
    var input = b.closest(".o-affix").querySelector("input");
    input.value = "";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.focus();
  });

  /* ---------- segment: aria-pressed ---------- */
  on("click", ".o-segment button", function (e, b) {
    var seg = b.closest(".o-segment");
    if (seg.hasAttribute("data-o-manual") || b.disabled) return;
    $$("button", seg).forEach(function (x) { var p = x === b; x.setAttribute("aria-pressed", p ? "true" : "false"); x.classList.toggle("is-active", p); });
  });

  /* ---------- search ---------- */
  function openSearch(s) {
    s.classList.add("is-open");
    var btn = s.querySelector(".o-search__btn");
    if (btn) btn.setAttribute("aria-expanded", "true");
    var input = s.querySelector("input");
    input.focus();
    input.select();
  }
  function closeSearch(s) {
    s.classList.remove("is-open");
    var btn = s.querySelector(".o-search__btn");
    if (btn) btn.setAttribute("aria-expanded", "false");
  }
  on("click", ".o-search__btn", function (e, b) { openSearch(b.closest(".o-search")); });
  on("keydown", ".o-search input", function (e, input) {
    if (e.key !== "Escape") return;
    var s = input.closest(".o-search");
    if (input.value) { input.value = ""; input.dispatchEvent(new Event("input", { bubbles: true })); return; }
    input.blur();
    var btn = s.querySelector(".o-search__btn");
    if (s.classList.contains("is-open")) { closeSearch(s); if (btn && getComputedStyle(btn).display !== "none") btn.focus(); }
  });
  document.addEventListener("focusout", function (e) {
    var s = e.target.closest && e.target.closest(".o-search.is-open");
    if (!s) return;
    setTimeout(function () { if (!s.contains(document.activeElement) && !s.querySelector("input").value) closeSearch(s); }, 0);
  });
  document.addEventListener("keydown", function (e) {
    if (!(e.metaKey || e.ctrlKey) || e.altKey || e.shiftKey) return;
    var s = document.querySelector('.o-search[data-o-shortcut="' + e.key.toLowerCase() + '"]');
    if (!s) return;
    e.preventDefault();
    openSearch(s);
  });

  /* ---------- platform-aware shortcut hints ---------- */
  function kbd() {
    $$("[data-o-kbd]").forEach(function (k) {
      var key = k.getAttribute("data-o-kbd");
      k.textContent = MAC ? "⌘" + key : "Ctrl " + key;
    });
    $$("textarea.o-textarea").forEach(grow);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", kbd); else kbd();

  window.OrbitForms = { setLoading: setLoading, setStatus: setStatus, validate: validate, check: check, open: openSearch, close: closeSearch, isMac: MAC };
})();
