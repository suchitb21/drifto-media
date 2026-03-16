# Drifto Media — Agency Website

A modern, responsive website for **Drifto Media**, a social media agency that helps brands build a strong digital presence through strategy, content creation, and performance marketing.

**Live:** [driftomedia.in](https://driftomedia.in)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Angular 21 (Standalone Components) |
| Styling | Scoped CSS with custom properties (design tokens) |
| Animations | CSS keyframes, GSAP ScrollTrigger, IntersectionObserver |
| Fonts | Horizon, Anton, Outfit, Poppins, Cinzel Decorative |
| Hosting | Netlify |
| Video | WebM with lazy loading & autoplay observers |

---

## Pages

- **Home** — Full-screen video hero, animated tagline, two-column intro with phone-frame video, stats counter, logo carousel, services accordion
- **Portfolio** — Tabbed layout with infinite CSS marquee strips for Reels (portrait 9:16), Social Media Creatives (square 1:1), and Long Form Production (landscape 16:9)
- **Wedding Gallery** — Video hero, portrait & landscape reel grids with modal lightbox playback
- **About Us** — Company story and team

---

## Features

- Fully responsive across desktop, tablet, and mobile
- GPU-accelerated infinite scroll carousels (pure CSS, no JS during animation)
- Lazy video loading — videos only download when played
- Modal lightbox with portrait/landscape detection, ESC key dismiss, and body scroll lock
- GSAP-powered services accordion with alternating card themes
- Animated stats counter with easeOut timing
- Floating WhatsApp CTA button
- IntersectionObserver-based video autoplay with iOS Safari fallback

---

## Project Structure

```
src/
  app/
    pages/
      hero/           # Home page (video hero, stats, logos, services)
      portfolio/      # Portfolio with tabbed marquee strips
      wg/             # Wedding Gallery (reel grid + modal)
      about/          # About Us
    components/
      navbar/         # Fixed navbar with mobile drawer
      footer/         # Footer with social links
    app.html          # Root layout (navbar + router-outlet + footer + WhatsApp FAB)
    app.routes.ts     # Route definitions
  styles.css          # Global styles & font-face declarations
public/
  wg/                 # Wedding gallery videos & thumbnails
  graphics/           # Social media creative images
  services/           # Service card images
  logos/              # Client logo images
  font/               # Custom fonts (Horizon)
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
ng serve

# Build for production
ng build
```

---

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Beige | `#fff5dc` | Background, light text |
| Orange | `#ff6105` | Primary accent, CTAs, highlights |
| Black | `#000000` | Text, dark sections, card backgrounds |

---

Built by [Drifto Media](https://driftomedia.in)
