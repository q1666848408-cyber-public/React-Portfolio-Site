# 🗂️ React Portfolio Site

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0080?style=flat&logo=framer&logoColor=white)

**Full-page personal portfolio with animated section transitions, bilingual i18n, dark/light theme, and a Neural network canvas background — built entirely in React 19 + TypeScript + Vite.**

> ⚠️ **Showcase Only** — ~15% skeleton. Real content and personal data not included.

---

## ✨ Overview

A single-page portfolio with a **full-page section switcher** instead of traditional scroll. Each section enters and exits with blur + slide + scale transitions via Framer Motion `AnimatePresence`. All content is driven by JSON locale files, making it fully bilingual (Chinese / English).

**Seven sections:**

| Section | Key Feature |
|---------|------------|
| Home | Education timeline + 2×2 stat grid + tech stack cloud |
| Awards | National shimmer cards + 3-col regular grid + floating particles |
| Competition | CSS subgrid equal-height cards + gradient top bar |
| Research | Numbered hierarchy + Georgia serif citation box |
| Internship | Timeline cards with bullet points |
| Projects | Featured large cards with metric chips + compact grid |
| Contact | Links grid |

---

## 🏗️ Architecture

```
App.tsx  ──►  AnimatePresence (section switcher)
              │
              ├── NeuralCanvas (fixed canvas, requestAnimationFrame)
              ├── Aurora (fixed radial gradient mesh)
              ├── NavBar (active pill + gold underline indicator)
              └── [Section Component] (one visible at a time)
                       │
                       └── Content driven by src/i18n/zh.json + en.json
```

### Key CSS Patterns

```css
/* Full-page section switcher — overflow hidden, sections are absolute */
.page-container {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

/* Aurora gradient mesh — slow drift animation */
.aurora-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: aurora-drift-1 25s ease-in-out infinite;
}

/* Card shimmer sweep */
.card-shimmer-overlay {
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.05) 50%,
    transparent 60%
  );
  background-size: 200% 100%;
  animation: card-shimmer 4s ease-in-out infinite;
}

/* Gold accent top bar on section cards */
.card-top-bar {
  height: 3px;
  background: linear-gradient(90deg, var(--c-acc), var(--c-acc3), var(--c-acc));
}
```

### CSS Subgrid (Competition equal-height rows)

```css
/* Outer grid */
.competition-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

/* Each card spans 3 rows — header / overview / contribution */
.comp-card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
}
/* Result: both cards' overview blocks align to the same row height */
```

---

## 📁 Structure

```
React-Portfolio-Site/
├── src/
│   ├── App.tsx                  # Root: NeuralCanvas + Aurora + AnimatePresence
│   ├── index.css                # CSS variables, keyframe animations
│   ├── components/
│   │   ├── Hero.tsx             # Landing — edu timeline + stats
│   │   ├── Awards.tsx           # Honors — shimmer national cards + grid
│   │   ├── Competition.tsx      # CSS subgrid equal-height layout
│   │   ├── Research.tsx         # Numbered cards + paper citation box
│   │   ├── Internship.tsx       # Work experience timeline
│   │   ├── Projects.tsx         # FeaturedCard + compact grid
│   │   ├── Contact.tsx          # Contact links
│   │   ├── NavBar.tsx           # Active pill indicator
│   │   ├── ScrollDots.tsx       # Right-side dot navigator
│   │   └── CursorGlow.tsx       # Custom cursor glow effect
│   ├── context/
│   │   ├── ThemeContext.tsx      # Dark/light toggle + data-theme attribute
│   │   └── PageContext.tsx       # Current section index + goTo()
│   └── i18n/
│       ├── zh.json              # All Chinese content (placeholder)
│       └── en.json              # All English content (placeholder)
├── package.json
├── vite.config.ts
└── index.html
```

---

## 🎨 Design Token System

All colors are CSS custom properties toggled by `data-theme="dark"`:

```css
:root {
  --c-acc:   #C4A97A;   /* gold accent */
  --c-acc2:  #B8956A;   /* secondary accent */
  --c-acc3:  #D4B896;   /* tertiary accent */
  --c-bg:    #FAFAF7;   /* page background */
  --c-bg2:   #F5F4F0;   /* alternate section bg */
  --c-card:  #FFFFFF;   /* card surface */
  --c-t1:    #1C1A18;   /* primary text */
  --c-t2:    #4A4540;   /* secondary text */
  --c-t3:    #8A837A;   /* muted text */
  --c-line:  #E8E4DE;   /* border */
  --c-sub:   #F0EDE8;   /* subtle fill */
  --c-nav:   rgba(250,250,247,0.85); /* nav blur bg */
}
[data-theme="dark"] {
  --c-bg:    #141210;
  --c-card:  #1E1C1A;
  /* ... full dark palette in index.css */
}
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Animation | Framer Motion 12 (`AnimatePresence`, `motion`, `whileInView`) |
| i18n | react-i18next (zh / en, JSON-driven) |
| Canvas | Vanilla `<canvas>` + `requestAnimationFrame` |
| Theme | CSS custom properties + `data-theme` attribute |
| Deploy | Vercel / Netlify (zero-config Vite) |

---

## 🚀 Getting Started

```bash
npm install
npm run dev   # http://localhost:5173
npm run build # production build → dist/
```

Replace placeholder content in `src/i18n/zh.json` and `src/i18n/en.json` to personalise.
