---
name: Posesco SRE Digital Infinity
colors:
  primary: "#6366f1" # Indigo-500
  accent-blue: "#60a5fa" # Blue-400
  accent-purple: "#c084fc" # Purple-400
  background: "#020617" # Slate-950
  surface: "rgba(15, 23, 42, 0.4)" # Slate-900/40 (Glass)
  border: "rgba(255, 255, 255, 0.05)" # White/5
  text-primary: "#f8fafc" # Slate-50
  text-secondary: "#cbd5e1" # Slate-300
typography:
  display:
    fontFamily: "Outfit"
    usage: Headlines, Hero
  sans:
    fontFamily: "Plus Jakarta Sans"
    usage: Body text, UI elements
  mono:
    fontFamily: "JetBrains Mono"
    usage: Code, Badges, Terminal effects
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  "2xl": 24px
  full: 9999px
---

# Design System: [posesco]

## Overview
A high-tech, SRE-inspired interface reflecting reliability, automation, and "Digital Infinity". The design prioritizes glassmorphism, depth through gradients, and a "terminal-but-modern" aesthetic.

## Visual Identity
- **Logo**: Always represented as `[posesco]` (square brackets).
- **Aesthetic**: SRE/DevOps, perspective grids, data-flow animations, hardware motifs.
- **Gradients**: Primarily `from-blue-400 via-indigo-400 to-purple-400`.

## Colors
- **Background**: Deep Slate (`#020617`) with subtle radial gradients for depth.
- **Glass Panels**: Semi-transparent Slate (`rgba(15, 23, 42, 0.4)`) with `backdrop-blur-xl`, `border-white/5`, and a subtle noise texture overlay.
- **Text**: 
  - High contrast (`slate-50`) for titles.
  - Medium contrast (`slate-300`) for readability.
  - Accents using Indigo (`indigo-400`) for interactive hints.

## Typography
- **Headlines**: `Outfit`, bold, tracking-tight.
- **Body**: `Plus Jakarta Sans`, leading-relaxed.
- **Command/Badges**: `JetBrains Mono`, uppercase (for badges), tracking-widest.

## Components & Patterns
- **Glass Panel**: Use `.glass-panel` for cards and containers. Must include a subtle border and backdrop blur.
- **Gradients**: Use `.gradient-text` for main headlines and primary CTAs.
- **Badges**: Small text (`10px`), `font-mono`, `uppercase`, `tracking-widest`, `rounded-full`.
- **Cards**: `rounded-2xl`, with interactive spotlight effects on hover (radial gradient following the cursor).
- **Sections**: Vertical padding of `py-24`, restricted to `max-w-7xl`.

## Do's and Don't's
- **Do**: Use monospaced fonts for technical metadata or status indicators.
- **Do**: Use "Magnetic" interactions for primary icons and buttons.
- **Don't**: Use sharp corners for main containers; prefer `rounded-2xl`.
- **Don't**: Overuse the purple gradient; keep indigo as the grounding primary accent.
- **Do**: Maintain the "Digital Infinity" theme with procedural backgrounds and perspective.

## Performance as Design
- **LCP Optimization**: Critical visual elements (Avatar, Hero text) must load with `fetchpriority="high"` to ensure the "Digital Infinity" feel is perceived instantly.
- **Visual Stability**: Maintain consistent aspect ratios for containers to prevent Layout Shift (CLS) during staggered reveals.
- **Font Rendering**: All decorative and body fonts must use `font-display: swap` to prioritize content availability over stylistic loading.
