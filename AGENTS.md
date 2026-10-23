# Orbit design system: guide for AI agents

Use this guide to build new pages in the Orbit style. Do not invent a new look. Use only the tokens and classes below.

## 1. Link these files
Put this in `<head>`, in this order. Use relative paths.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="tokens.css">      <!-- tokens + Inter Variable import -->
<link rel="stylesheet" href="components.css">  <!-- all o-* classes -->
<script src="icons.js"></script>               <!-- inline SVG sprite: #i-<name> -->
<script src="grain.js" defer></script>         <!-- grain, pattern, hover spring for .o-gg -->
<script src="forms.js" defer></script>         <!-- validation, loading, search, show password, clear -->
```

- `tokens.css` is the single source of truth. Never hard-code a colour, size, radius, or shadow that a token covers.
- No build step. No framework. Plain HTML and CSS.

## 2. Tokens (CSS custom properties, prefix `--o-`)
- Neutrals: `--o-gray-0` to `--o-gray-950`. Semantic: `--o-ink`, `--o-bg`, `--o-surface`, `--o-surface-sunken`, `--o-surface-hover`, `--o-surface-subtle`, `--o-surface-active`.
- Text: `--o-text`, `--o-text-strong`, `--o-text-app`, `--o-text-2`, `--o-text-muted`, `--o-text-subtle`, `--o-text-placeholder`.
- Lines: `--o-line`, `--o-line-2`, `--o-line-soft`, `--o-line-strong`.
- Accent: `--o-accent` (#1f6fd1), `--o-accent-soft`. Status: `--o-red|orange|yellow|green` and `-soft`. Labels: `--o-label-purple|sky|orange|emerald|red|slate|green|amber|gray`.
- Gradient: `--o-gg-0..4` (#d3d1ca, #dccdb3, #c99a69, #94502b, #2c160d), `--o-gg-base`, `--o-gg-blob-1..5`.
- Type: `--o-font` (Inter Variable). Weights `--o-w-regular 400`, `book 450`, `display 460`, `medium 500`, `strong 520`, `semibold 550`, `bold 600`. Sizes `--o-display-*`, `--o-h2-*`, `--o-h3-*`, `--o-lede-*`, `--o-body-*`, `--o-app-*`.
- Space: `--o-space-1..13` (2, 4, 6, 8, 10, 12, 14, 18, 24, 32, 44, 58, 72 px). Layout: `--o-wrap` 1120px, `--o-gutter` 24px, `--o-nav-h` 60px.
- Radius: `--o-radius-xs 4`, `sm 5`, `md 6`, `lg 8`, `btn 9`, `window 10`, `panel 16`, `pill`.
- Shadow: `--o-ring`, `--o-ring-strong`, `--o-shadow-card`, `--o-shadow-pop`, `--o-shadow-window`, `--o-shadow-focus`.
- Motion: `--o-ease-out`, `--o-dur-fast` .15s, `--o-dur-base` .25s, `--o-spring-stiffness` 70, `--o-spring-damping` .86.
- Z-index: `--o-z-nav 2`, `grain 5`, `content 6`, `border 10`, `drawer 40`, `overlay 50`.
- Forms and access: `--o-focus-color` (accent), `--o-focus-width` 2px, `--o-focus-offset` 2px, `--o-hit` 44px, `--o-input-size` (15px, 16px on touch), `--o-app-input-size`, `--o-red-ring`, `--o-disabled-opacity` .45, `--o-app-bar` 36px, `--o-app-row` 38px (both 44px in `o-app--full` on touch).

## 3. Components (class API)
State classes: `is-active`, `is-open`, `is-nav-open`, `is-hidden`, `is-compact`, `is-loading`, `is-success`, `is-error`. Modifiers use `--`. Toggle state lives in ARIA (`aria-pressed`, `aria-checked`, `aria-selected`, `aria-expanded`, `aria-invalid`); CSS styles those attributes.

| Pattern | Classes |
|---|---|
| Layout | `o-wrap`, `o-section`, `o-section--line`, `o-section__head`, `o-grid` (+`o-grid--2`, `o-grid--4`), `o-split` |
| Site bar (preview nav) | `o-sitebar > o-wrap o-sitebar__inner > o-sitebar__name, o-sitebar__link(.is-active)` |
| Nav | `o-nav > o-wrap o-nav__inner > o-brand(+svg o-brand__mark), o-nav__links, o-nav__actions(o-nav__link, o-btn)` |
| Type | `o-eyebrow`, `o-display`, `o-h2`, `o-h3`, `o-lede`, `o-body`, `o-small`, `o-strong` |
| Hero | `o-hero` (holds eyebrow, display, lede, `o-ctas`), then `o-stage` with the gradient |
| Buttons | `o-btn` + `o-btn--primary` / `--secondary` / `--ghost` / `--accent`; size `--sm` (nav), `--app` (24px, in app UI); `--block`. States: `disabled`, `is-loading` (spinner, set with `OrbitForms.setLoading`). Arrow icon: `o-ic o-ic--nudge`. Toolbar add button: `o-btn__label` + `o-btn__icon-sm` (icon only in narrow apps) |
| Badges | `o-badge` (count), `o-badge--neutral`, `o-pill` + `o-pill__new`, `o-tag` + `o-tag__dot` (`style="--c:var(--o-label-x)"`), `o-date`, `o-kbd` |
| Gradient surface | `o-gg` + size `o-gg--hero` (640px) / `--card` / `--tile`; `data-gg-pattern="contours|rays|none"`; `data-gg-hover="off"` |
| App window | `o-app` + `o-app--float` (inside `o-gg--hero`) / `--full` (full screen) / `--inset` (420px) |
| App chrome | `o-topbar`, `o-ws`, `o-ws__logo`, `o-search` (real one: `form role="search" data-o-search` + `o-search__btn` + `kbd data-o-kbd="K"`), `o-ask`, `o-me`, `o-menu-btn`, `o-app__body`, `o-rail`, `o-rail__item`, `o-rail__icon`, `o-side`, `o-side__head`, `o-side__new`, `o-side__item`, `o-side__group`, `o-emoji` |
| Page header | `o-main` (+`o-main--views`), `o-ph`, `o-ph__title`, `o-tabs`, `o-tab`, `o-ph__right`, `o-iconbtn` |
| Toolbar | `o-toolbar`, `o-toolbar__title`, `o-toolbar__right`, `o-chip` (+`o-chip__label`; toggle chips are buttons with `aria-pressed`) |
| List | `o-list`, `o-group`, `o-group__n`, `o-status--backlog|todo|progress|done`, `o-row` (+`o-row--sub`), `o-pri--urgent|high|med|low|sub`, `o-id`, `o-row__title`, `o-meta`, `o-avatars`, `o-avatar`, `o-est` |
| Dashboard | `o-view` (+`o-view__body`, `o-view--bare`), `o-pad`, `o-stats`, `o-stat`, `o-stat__label|value|delta`, `o-progress` + `o-progress__bar` (`style="--v:60%"`), `o-panel`, `o-panel__head`, `o-feed`, `o-feed__item`, `o-board`, `o-col`, `o-col__head`, `o-kcard`, `o-empty`, `o-scrim` |
| Cards | `o-card` (+`--app`, `--sunken`, `--hover`), `o-card__icon`, `o-card__title`, `o-card__text`, `o-card__label` |
| Form layout | `o-form` (grid), `o-field` (label + control + hint + error), `o-field-row` (fields side by side, wraps), `o-fieldset` (+`--card`) + `o-legend`, `o-choices` (+`--row`), `o-inline-form` (input + button, stacks under 480px), `o-form-actions`, `o-form-status` (+`is-success`/`is-error`, `role="status" aria-live="polite"`) |
| Field text | `o-label` (+`o-label__req` red `*`, `o-label__opt` "Optional"), `o-hint`, `o-error` (empty until there is an error) |
| Controls | `o-input` (+`--app`), `o-select` (native select + chevron), `o-textarea` (auto-grow, Cmd/Ctrl+Enter submits), `o-check`, `o-radio`, `o-switch` (`role="switch" aria-checked`), `o-segment` (buttons with `aria-pressed`) |
| Affix | `o-affix` (+`o-affix--pre`, `o-affix--btn`, or `style="--pre:Npx;--suf:Npx"`) > `o-input` + `o-affix__pre` / `o-affix__suf` / `o-affix__btn` (`data-o-clear` or `data-o-reveal aria-pressed`) |
| Marketing | `o-logos` + `o-logos__label`, `o-price` (+`--featured`), `o-price__name|amount`, `o-checklist`, `o-faq` (details/summary), `o-cta`, `o-footer` |
| Icons | `<svg class="o-ic"><use href="#i-NAME"/></svg>`; sizes `o-ic--xs|sm|lg`. Names: see `window.OrbitIcons` |

Priority icon markup: `<span class="o-pri o-pri--high"><svg><use href="#i-pri-bars"/></svg></span>`. Use `#i-pri-urgent` for urgent and `#i-pri-sub` for sub-items.

## 4. Composition rules
1. Use one gradient surface (`o-gg`) per page. It goes behind the main product visual, not behind body text. Only the doc page (`index.html`) shows more than one.
2. Always keep the grain on. grain.js adds it. Do not remove the canvas or change opacity 0.4 or amp 70.
3. The gradient runs light and cool at the top to dark and warm at the bottom. Do not reorder the stops. Do not add hues outside sand, ochre, rust, brown.
4. Headlines use weight 460 (`o-display`, `o-h2`) with negative tracking. Never use bold for headlines.
5. Body text uses weight 400 in `--o-text-muted`. UI labels use 450 to 550.
6. Use ink (`o-btn--primary`) for the main action. Use blue (`--o-accent`) only for the eyebrow, counts, and the in-app add action. Use one primary button per group.
7. Use hairline rings (`--o-ring`) for borders, not heavy borders. Use `--o-shadow-window` only for app windows.
8. Use `o-app--float` only inside `o-gg--hero`. Let the window run past the bottom of the surface.
9. Centre marketing heroes. Keep the headline to 2 lines and the lede to about 540px.
10. Under `prefers-reduced-motion`, motion stops. Do not add motion that ignores it.

## 5. Forms and accessibility rules
1. **Focus is an outline.** `:focus-visible` draws `outline: 2px solid var(--o-focus-color)` with a 2px offset, so no component `box-shadow` can hide it. Never set `outline: none` on a control unless it shows its own focus ring (`o-input`, `o-select`, `o-textarea`, and the `o-search` box do). Keyboard focus must be visible on every control.
2. **16px inputs on touch.** Inputs use `--o-input-size`, which is 16px under `(pointer: coarse)`, so iOS never zooms. Do not set a smaller `font-size` on an input.
3. **44px hit areas on touch.** Small controls (`o-chip`, `o-iconbtn`, `o-menu-btn`, `o-tab`, `o-switch`, `o-segment` buttons, `o-btn--sm`, `o-btn--app`, `o-affix__btn`) get an invisible centred `::before` of at least `--o-hit` under `(pointer: coarse)`. Checks and radios are 44px tall; `o-input--app` is 44px. If you make a new small control, add it to that rule. Do not put two small controls closer than 12px on touch.
4. **Toggles say their state.** A button that stays on uses `aria-pressed="true|false"` (segment buttons, toggle chips, show password). A switch uses `role="switch"` + `aria-checked`. Tabs use `aria-selected`. Active states never change font weight.
5. **Labels.** Every control has a visible `o-label` with `for`/`id` (or a `o-sr` label when the design has none, as in the CTA). Placeholders are examples, never labels. Mark required fields with `required` and `o-label__req` (`aria-hidden="true"`); mark optional ones with `o-label__opt`.
6. **Hints and errors.** Link them with `aria-describedby="ID-hint ID-error"`. The error element is an empty `<p class="o-error" id="ID-error">` until there is an error.
7. **Validation pattern.** `<form novalidate data-o-validate>` + forms.js. On submit: every field is checked, messages go in `o-error` with an icon, the control gets `aria-invalid="true"` (red ring), `o-form-status` sums it up, and focus moves to the first bad field. A field is checked on blur only once it has a value, then live while it shows an error. Write messages that say how to fix it: "Enter an email address like name@company.com." Override with `data-o-msg-required`, `data-o-msg-type`, `data-o-msg-short`, `data-o-msg-pattern`.
8. **Submitting.** A valid submit sets the button to `is-loading` + `disabled` + `aria-busy` with a verb label (`data-o-loading="Sending link…"`), then fires `o:submit`. Add `data-o-async` and call `e.detail.done(message, ok)` when the work is done; the message goes to the live `o-form-status`.
9. **Disabled and read-only.** Use the native `disabled` and `readonly` attributes. Disabled is grey and `not-allowed`; read-only is sunken and stays selectable.
10. **Right input attributes.** Email: `type="email" inputmode="email" autocomplete="email" spellcheck="false"`. Password: `autocomplete="new-password"` or `current-password` + a `data-o-reveal` button. Search: `form role="search"`, `type="search" autocomplete="off" spellcheck="false" data-1p-ignore`; Esc clears, then blurs.
11. **Shortcut hints follow the platform.** Write `<kbd class="o-kbd" data-o-kbd="K">⌘K</kbd>`; forms.js shows "⌘K" on Apple devices and "Ctrl K" elsewhere. `data-o-shortcut="k"` on an `o-search` wires the shortcut.
12. **Touch and hover.** Hover styles live inside `@media (hover: hover) and (pointer: fine)`. Controls use `touch-action: manipulation` and scale to .97 while pressed.

## 6. Minimal page template

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page title</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components.css">
<script src="icons.js"></script>
<script src="grain.js" defer></script>
<script src="forms.js" defer></script>
</head>
<body>
<header class="o-nav"><div class="o-wrap o-nav__inner">
  <a class="o-brand" href="#"><svg class="o-ic o-brand__mark"><use href="#i-orbit"/></svg>Orbit</a>
  <nav class="o-nav__links"><a href="#">Product</a><a href="#">Pricing</a></nav>
  <div class="o-nav__actions"><a class="o-nav__link" href="#">Log in</a><a class="o-btn o-btn--primary o-btn--sm" href="#">Get started</a></div>
</div></header>
<main>
  <section class="o-hero o-wrap">
    <p class="o-eyebrow">Short eyebrow</p>
    <h1 class="o-display">One clear promise in two lines or less</h1>
    <p class="o-lede">One or two plain sentences that explain the product.</p>
    <div class="o-ctas">
      <a class="o-btn o-btn--primary" href="#">Main action</a>
      <a class="o-btn o-btn--secondary" href="#">Second action <svg class="o-ic o-ic--nudge"><use href="#i-arrow"/></svg></a>
    </div>
  </section>
  <section class="o-stage o-wrap">
    <div class="o-gg o-gg--hero" data-gg-pattern="contours">
      <!-- put an .o-app.o-app--float window here -->
    </div>
  </section>
</main>
</body>
</html>
```

## 7. Reference pages
- `index.html`: every token and component, live, with copyable markup. The Forms section shows every field state.
- `landing.html`: full marketing page built from the system.
- `dashboard.html`: full-screen app built from the system.
Copy markup from these pages before you write new markup.
