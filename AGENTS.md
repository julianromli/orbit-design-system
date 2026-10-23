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

## 3. Components (class API)
State classes: `is-active`, `is-open`, `is-nav-open`, `is-hidden`, `is-compact`. Modifiers use `--`.

| Pattern | Classes |
|---|---|
| Layout | `o-wrap`, `o-section`, `o-section--line`, `o-section__head`, `o-grid` (+`o-grid--2`, `o-grid--4`), `o-split` |
| Site bar (preview nav) | `o-sitebar > o-wrap o-sitebar__inner > o-sitebar__name, o-sitebar__link(.is-active)` |
| Nav | `o-nav > o-wrap o-nav__inner > o-brand(+svg o-brand__mark), o-nav__links, o-nav__actions(o-nav__link, o-btn)` |
| Type | `o-eyebrow`, `o-display`, `o-h2`, `o-h3`, `o-lede`, `o-body`, `o-small`, `o-strong` |
| Hero | `o-hero` (holds eyebrow, display, lede, `o-ctas`), then `o-stage` with the gradient |
| Buttons | `o-btn` + `o-btn--primary` / `--secondary` / `--ghost` / `--accent`; size `--sm` (nav), `--app` (24px, in app UI); `--block`. Arrow icon: `o-ic o-ic--nudge`. Toolbar add button: `o-btn__label` + `o-btn__icon-sm` (icon only in narrow apps) |
| Badges | `o-badge` (count), `o-badge--neutral`, `o-pill` + `o-pill__new`, `o-tag` + `o-tag__dot` (`style="--c:var(--o-label-x)"`), `o-date`, `o-kbd` |
| Gradient surface | `o-gg` + size `o-gg--hero` (640px) / `--card` / `--tile`; `data-gg-pattern="contours|rays|none"`; `data-gg-hover="off"` |
| App window | `o-app` + `o-app--float` (inside `o-gg--hero`) / `--full` (full screen) / `--inset` (420px) |
| App chrome | `o-topbar`, `o-ws`, `o-ws__logo`, `o-search`, `o-ask`, `o-me`, `o-menu-btn`, `o-app__body`, `o-rail`, `o-rail__item`, `o-rail__icon`, `o-side`, `o-side__head`, `o-side__new`, `o-side__item`, `o-side__group`, `o-emoji` |
| Page header | `o-main` (+`o-main--views`), `o-ph`, `o-ph__title`, `o-tabs`, `o-tab`, `o-ph__right`, `o-iconbtn` |
| Toolbar | `o-toolbar`, `o-toolbar__title`, `o-toolbar__right`, `o-chip` (+`o-chip__label`) |
| List | `o-list`, `o-group`, `o-group__n`, `o-status--backlog|todo|progress|done`, `o-row` (+`o-row--sub`), `o-pri--urgent|high|med|low|sub`, `o-id`, `o-row__title`, `o-meta`, `o-avatars`, `o-avatar`, `o-est` |
| Dashboard | `o-view` (+`o-view__body`, `o-view--bare`), `o-pad`, `o-stats`, `o-stat`, `o-stat__label|value|delta`, `o-progress` + `o-progress__bar` (`style="--v:60%"`), `o-panel`, `o-panel__head`, `o-feed`, `o-feed__item`, `o-board`, `o-col`, `o-col__head`, `o-kcard`, `o-empty`, `o-scrim` |
| Cards | `o-card` (+`--app`, `--sunken`, `--hover`), `o-card__icon`, `o-card__title`, `o-card__text`, `o-card__label` |
| Forms | `o-field`, `o-label`, `o-hint`, `o-input` (+`--app`), `o-inline-form`, `o-check`, `o-switch` (`role="switch" aria-checked`), `o-segment` |
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

## 5. Minimal page template

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

## 6. Reference pages
- `index.html`: every token and component, live, with copyable markup.
- `landing.html`: full marketing page built from the system.
- `dashboard.html`: full-screen app built from the system.
Copy markup from these pages before you write new markup.
