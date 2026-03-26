# DESIGN.md — ESAP AI Design System

This document captures the existing design system as implemented in code. It serves as the
single source of truth for visual decisions: colors, typography, spacing, components, animation
principles, and RTL guidelines.

---

## 1. Color Palette

### Brand Colors

| Token                        | Value                         | Usage                          |
|------------------------------|-------------------------------|--------------------------------|
| `--color-primary`            | `rgba(19, 245, 132, 1)`      | Primary green (#13F584)        |
| `--color-primary-dark`       | `rgba(9, 9, 9, 1)`           | Near-black contrast            |
| `--color-white`              | `rgba(255, 255, 255, 1)`     | Primary text on dark           |
| `--color-black`              | `rgba(0, 0, 0, 1)`           | Body background                |

### Primary Green Opacity Scale

| Token                        | Opacity | Usage                             |
|------------------------------|---------|-----------------------------------|
| `--color-primary-opacity-90` | 90%     | Hover states, emphasized elements |
| `--color-primary-opacity-50` | 50%     | Scrollbar thumb, medium accents   |
| `--color-primary-opacity-48` | 48%     | Gradient endpoints                |
| `--color-primary-opacity-30` | 30%     | Subtle accents, shadows           |
| `--color-cyber-grid`         | 5%      | Background grid patterns          |

### White Opacity Scale

| Token                        | Opacity | Usage                              |
|------------------------------|---------|-------------------------------------|
| `--color-white-opacity-70`   | 70%     | Secondary body text                 |
| `--color-white-opacity-25`   | 25%     | Borders                             |
| `--color-white-opacity-20`   | 20%     | Subtle borders                      |
| `--color-white-opacity-15`   | 15%     | Background fills                    |
| `--color-white-opacity-10`   | 10%     | Background fills, dividers          |

### Backgrounds

| Token               | Value       | Usage                                |
|----------------------|-------------|--------------------------------------|
| `--color-dark`       | `#030d08`   | Deep green-tinted dark background    |
| `--color-bg-deep`    | `#020805`   | Ultra-dark layering surface          |
| `body background`    | `#000000`   | Global body background               |
| `.glass-cyber`       | `rgba(2, 3, 5, 0.7)` + `blur(12px)` | Glassmorphism cards |

### Gradients

| Name                     | Definition                                                   |
|--------------------------|--------------------------------------------------------------|
| `--gradient-primary`     | Vertical white → green-48% fade                              |
| `--gradient-radial-white`| Radial white center → 10% opacity edge                      |
| `.hero-mesh-gradient`    | Multi-layer radial gradients on `#030d08` base               |

### Glow Effects

| Class                          | Effect                                          |
|--------------------------------|-------------------------------------------------|
| `.filter-glow-primary`         | `drop-shadow` 20px/40px green at 60%/30%       |
| `.filter-glow-primary-strong`  | `drop-shadow` 20px/40px green at 80%/40%       |
| `.shadow-glow-primary-feature` | `box-shadow` outer + inset green glow           |
| `.shadow-primary-30`           | Elevation shadow with green-30% tint            |
| `.shadow-primary-50`           | Elevation shadow with green-50% tint            |

---

## 2. Typography

### Font Stack

| Variable         | Stack                                                         |
|------------------|---------------------------------------------------------------|
| `--font-sans`    | `var(--font-inter), "Inter", Arial, ui-sans-serif, system-ui` |
| `--font-heading` | Same as `--font-sans` (to be updated with display font)       |

**Font loading**: Inter via `next/font/google` with weights 400, 500, 600, 700.
`display: "swap"`, `preload: true`.

### Base Sizes

| Element   | Size      | Weight | Line Height | Letter Spacing |
|-----------|-----------|--------|-------------|----------------|
| `body`    | 18.24px   | 400    | 1.6         | normal         |
| `h1`      | 96px      | 700    | 1.0         | -0.02em        |
| `h2`      | 18.24px   | 600    | inherit     | normal         |
| `h3`-`h6` | inherit  | 700    | inherit     | normal         |

### Responsive Typography Classes

These utility classes scale text across breakpoints:

| Class                  | Mobile    | `sm`     | `md`     | `lg`     |
|------------------------|-----------|----------|----------|----------|
| `.text-responsive-xs`  | `text-xs` | `text-sm`| —        | —        |
| `.text-responsive-sm`  | `text-sm` | `text-base`| —      | —        |
| `.text-responsive-base`| `text-base`|`text-lg`| `text-xl`| —       |
| `.text-responsive-lg`  | `text-lg` | `text-xl`| `text-2xl`| —      |
| `.text-responsive-xl`  | `text-xl` | `text-2xl`|`text-3xl`| —      |
| `.text-responsive-2xl` | `text-2xl`| `text-3xl`|`text-4xl`| —      |
| `.text-responsive-3xl` | `text-3xl`| `text-4xl`|`text-5xl`|`text-6xl`|
| `.text-responsive-4xl` | `text-4xl`| `text-5xl`|`text-6xl`|`text-7xl`|

### Text Utility Classes

| Class                | Style                                      |
|----------------------|--------------------------------------------|
| `.text-label-caps`   | Bold, uppercase, `tracking-widest`, `text-xs` |
| `.text-premium-body` | `rgba(255, 255, 255, 0.9)` — near-white    |
| `.text-primary`      | `var(--color-primary)` — brand green        |

### Selection Style

- Background: `var(--color-primary)` (green)
- Text: `var(--color-black)`

---

## 3. Spacing System

### Responsive Gap Classes

| Class                    | Mobile  | `sm`    | `md`    | `lg`     |
|--------------------------|---------|---------|---------|----------|
| `.spacing-responsive-xs` | `gap-1` | `gap-2` | `gap-3` | —        |
| `.spacing-responsive-sm` | `gap-2` | `gap-3` | `gap-4` | —        |
| `.spacing-responsive-md` | `gap-4` | `gap-6` | `gap-8` | —        |
| `.spacing-responsive-lg` | `gap-6` | `gap-8` | `gap-10`| `gap-12` |
| `.spacing-responsive-xl` | `gap-8` | `gap-10`| `gap-12`| `gap-16` |

### Responsive Padding Classes

| Class                     | Padding scale                    |
|---------------------------|----------------------------------|
| `.padding-responsive-sm`  | `p-3 → p-4 → p-6`              |
| `.padding-responsive-md`  | `p-4 → p-6 → p-8`              |
| `.padding-responsive-lg`  | `p-6 → p-8 → p-10 → p-12`     |
| `.container-responsive`   | `px-4 → px-6 → px-8 → px-12`  |

### Section Component Presets

The `<Section>` component (`components/ui/section.tsx`) provides standardized padding
and container widths:

**Padding presets** (`padding` prop):

| Preset | Vertical padding                      | Horizontal padding             |
|--------|---------------------------------------|--------------------------------|
| `none` | None                                  | None                           |
| `sm`   | `py-6 → py-8 → py-10`               | `px-4 → px-6 → px-8 → px-12` |
| `md`   | `py-10 → py-12 → py-16 → py-20`     | `px-4 → px-6 → px-8 → px-12` |
| `lg`   | `py-12 → py-16 → py-24 → py-32`     | `px-4 → px-6 → px-8 → px-12` |

**Container max-width presets** (`containerMaxWidth` prop):

`sm` | `md` | `lg` | `xl` | `2xl` | `5xl` | `7xl` | `wide` (1400px) | `full` | `standard`

Default: `wide` (1400px).

---

## 4. Component Library

### UI Primitives (`components/ui/`)

27 components organized by function:

**Layout & Structure**
- `section.tsx` — Base section wrapper with padding/container presets
- `section-header.tsx` — Animated section heading (badge + title + accent line + subtitle)
- `section-mask.tsx` — Masking utility
- `lazy-section.tsx` — Intersection Observer lazy loading wrapper
- `card.tsx` — Card container with gradient border and glass effects

**Typography & Content**
- `badge.tsx` — Basic badge
- `badge-chip.tsx` — Glassmorphism pill badge with icon, variant system (primary/red)
- `hero-badge.tsx` — Hero badge with animated beam effect (motion/react)
- `typewriter-title.tsx` — Letter-by-letter animated title
- `expandable-text.tsx` — Collapsible text with show more/less
- `counter.tsx` — Animated number counter

**Interactive**
- `button.tsx` — CVA-based button (variants: default, primary, outline, ghost, link, destructive; sizes: sm, default, lg, icon)
- `toast.tsx` — Toast notification system
- `cookie-consent-banner.tsx` — Floating consent UI

**Cards**
- `product-card.tsx` — Product display with hover effects
- `service-card.tsx` — Service display with image overlay + GSAP
- `tech-card.tsx` — Technology card with GSAP hover
- `mission-card.tsx` — Mission/goals display card

**Media**
- `optimized-video.tsx` — Performance-optimized video player
- `remotion-player-wrapper.tsx` — Remotion video integration
- `animated-svg-loader.tsx` — GSAP-driven SVG shape animations

**3D**
- `globe.tsx` — Three.js globe visualization

**Loading**
- `global-loader.tsx` — Full-page loader with GSAP
- `intro-loader.tsx` — Intro animation screen

**Visualization**
- `process-timeline.tsx` — Vertical timeline with staggered GSAP + ScrollTrigger
- `spotlight.tsx` — Spotlight effect

---

## 5. Animation Principles

### Libraries

| Library              | Role                              |
|----------------------|-----------------------------------|
| GSAP + ScrollTrigger | Primary animation engine          |
| motion/react         | Component-level micro-interactions|
| Intersection Observer| Lazy loading, scroll reveals      |

### Easing Standards

| Category       | Ease                  | Usage                        |
|----------------|-----------------------|------------------------------|
| Standard exit  | `power2.out`          | General transitions          |
| Smooth exit    | `power3.out`          | Content reveals              |
| Strong exit    | `power4.out`          | Hero animations              |
| Bidirectional  | `power2.inOut`        | Hover states                 |
| Springy        | `back.out(1.2)`       | Playful element entrances    |
| Breathing      | `sine.inOut`          | Infinite loops (glow, pulse) |

### Duration Scale

| Category          | Range         | Examples                        |
|-------------------|---------------|---------------------------------|
| Quick transitions | 0.3s – 0.4s  | Hover, focus, toggle            |
| Standard reveals  | 0.5s – 0.6s  | Fade-in, slide-up               |
| Longer reveals    | 0.7s – 0.8s  | Section headers, hero elements  |
| Complex timelines | 1.2s – 1.5s  | Multi-step sequences            |
| Continuous loops  | 2.2s – 3.0s  | Breathing, floating, pulsing    |

### Stagger Delays

| Detail level | Delay per element |
|-------------|-------------------|
| Fine        | 0.05s – 0.1s     |
| Medium      | 0.1s – 0.2s      |
| Coarse      | 0.3s – 0.4s      |

### Common Patterns

**Fade in with Y offset** (most common entry animation):
```js
gsap.from(el, { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" })
```

**Scale with opacity**:
```js
gsap.from(el, { opacity: 0, scale: 0.95, duration: 0.4, ease: "power2.out" })
```

**Breathing loop**:
```js
gsap.to(el, { scale: 1.05, opacity: 0.7, duration: 2.5, ease: "sine.inOut", repeat: -1, yoyo: true })
```

**ScrollTrigger standard config**:
```js
scrollTrigger: {
  trigger: el,
  start: "top 85%",
  toggleActions: "play none none reverse",
}
```

### CSS Keyframe Animations

| Animation        | Duration | Behavior                         |
|------------------|----------|----------------------------------|
| `light-sweep`    | 1.5s     | Horizontal skew sweep            |
| `cell-ripple`    | 200ms    | Opacity pulse (configurable delay)|
| `pulse-slow`     | 2.2s     | Breathing opacity (infinite)     |
| `shimmer`        | —        | Horizontal translate -100% → 100%|
| `sheen`          | 2s       | Background position shift (infinite)|
| `scan`           | —        | Vertical line sweep              |
| `slideInFromTop` | —        | -100% → 0% translateY + opacity |

### Performance Utilities

| Class                | Effect                                    |
|----------------------|-------------------------------------------|
| `.animate-optimized` | `will-change: transform, opacity` + GPU   |
| `.animate-gpu`       | `translateZ(0)` + `backface-visibility`   |

### Accessibility — Reduced Motion

All animations respect `prefers-reduced-motion: reduce`:
- GSAP animations check `prefersReducedMotion()` utility before running
- CSS animations are disabled via `animation: none !important`
- Transitions are limited to color/background changes only
- `will-change` is reset to `auto`

---

## 6. RTL (Right-to-Left) Support

### Layout Setup

```html
<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
```

### Locale Detection

```tsx
import { useLocale } from "next-intl";
const locale = useLocale();
const isRTL = locale === "ar";
```

### CSS — Tailwind Logical Properties

Always use logical properties instead of physical direction:

| Instead of          | Use                               |
|---------------------|-----------------------------------|
| `left-*` / `right-*` | `start-*` / `end-*`            |
| `pl-*` / `pr-*`    | `ps-*` / `pe-*`                  |
| `ml-*` / `mr-*`    | `ms-*` / `me-*`                  |
| `text-left/right`  | `text-start` / `text-end`        |
| CSS `left` / `right`| `inset-inline-start` / `inset-inline-end` |

For cases where logical properties aren't sufficient, use Tailwind's `rtl:` / `ltr:` prefixes:
```html
<div class="ltr:ml-auto rtl:mr-auto">
```

### GSAP — Direction Multiplier

All x-axis animations must be multiplied by a direction factor:

```tsx
const dir = locale === "ar" ? -1 : 1;

gsap.to(el, { x: 100 * dir });       // +100 LTR, -100 RTL
gsap.set(el, { x: dir * -80 });      // Flipped initial position
```

### SVG Mirroring

For directional SVGs (arrows, flow paths), apply CSS mirroring in RTL:
```tsx
<svg className={isRTL ? "scale-x-[-1]" : ""}>
```

### Date Formatting

```tsx
const formatted = date.toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US");
```

---

## 7. Glass & Surface Treatments

### Glassmorphism

`.glass-cyber` — the standard glass card treatment:
```css
background: rgba(2, 3, 5, 0.7);
backdrop-filter: blur(12px);
border: 1px solid rgba(19, 245, 132, 0.15);
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
```

### Hero Mesh Gradient

Multi-layer radial gradient background for hero sections:
```css
background-color: #030d08;
background-image:
  radial-gradient(circle at 50% 0%, rgba(19, 245, 132, 0.15) 0%, transparent 60%),
  radial-gradient(circle at 0% 50%, rgba(6, 78, 59, 0.1) 0%, transparent 50%),
  radial-gradient(circle at 100% 50%, rgba(6, 78, 59, 0.1) 0%, transparent 50%),
  radial-gradient(ellipse at 50% 120%, rgba(19, 245, 132, 0.2) 0%, transparent 70%);
```

### Nav Glow Effect

Radial green glow on hover/active state for navigation links:
```css
background: radial-gradient(circle at 50% 50%,
  rgba(19, 245, 132, 0.45) 0%,
  rgba(19, 245, 132, 0.15) 55%,
  rgba(19, 245, 132, 0.05) 75%,
  transparent 100%);
filter: blur(18px);
```

### Mobile Menu Item

Gradient border mask with green accent on hover:
```css
background: rgba(255, 255, 255, 0.02);
border: 1px solid rgba(255, 255, 255, 0.05);
/* Hover: background shifts to rgba(19, 245, 132, 0.05) */
```

---

## 8. Scrollbar

Custom scrollbar matching the dark theme:

| Part    | Style                                    |
|---------|------------------------------------------|
| Width   | 6px                                      |
| Track   | `var(--color-dark)` (#030d08)            |
| Thumb   | `var(--color-primary-opacity-50)` (green)|
| Hover   | `rgba(255, 255, 255, 0.3)`              |

---

## 9. Provider Architecture

The app wraps content in a layered provider stack (defined in `app/[locale]/layout.tsx`):

```
NextIntlClientProvider
  └─ MotionProvider
       └─ ToastProvider
            └─ CookieConsentProvider
                 └─ WebVitalsProvider
                      └─ SmoothScrollProvider
                           └─ ProductMenuProvider
                                └─ ServiceMenuProvider
                                     └─ IntroLoader
                                          └─ Navbar + Main + Footer
```

---

## 10. Design Principles Summary

1. **Dark-first**: Pure black body, green accents, white text. No light mode.
2. **Monochromatic green**: Single hue (#13F584) at varying opacities for hierarchy.
3. **Glass & glow**: Translucent surfaces with backdrop blur and green glow edges.
4. **Motion-rich, accessible**: GSAP-driven animations with full `prefers-reduced-motion` support.
5. **Bilingual-native**: All layouts use CSS logical properties; animations adapt to RTL.
6. **Responsive-first**: Every typography, spacing, and padding value scales across 4 breakpoints.
7. **Performance-conscious**: GPU-accelerated animations, lazy sections, optimized video, adaptive quality.
