import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// ─────────────────────────────────────────────────────────────
// TAB TYPE — strict union for type-safe tab switching
// ─────────────────────────────────────────────────────────────
export type TabKey = 'reels' | 'social' | 'longform';

// ─────────────────────────────────────────────────────────────
// SLIDE INTERFACE
// thumb   → image shown in the strip
// heading → caption overlay (bottom-right)
// link    → opens on click
// ─────────────────────────────────────────────────────────────
export interface Slide {
  thumb: string;
  heading: string;
  link: string;
  alt: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Portfolio {

  // ─────────────────────────────────────────────────────────────
  // ACTIVE TAB  — [hidden] keeps all strips in DOM (no reflow)
  // ─────────────────────────────────────────────────────────────
  activeTab: TabKey = 'reels';

  tabs: { key: TabKey; label: string }[] = [
    { key: 'reels',    label: 'Reels'                  },
    { key: 'social',   label: 'Social Media Creatives' },
    { key: 'longform', label: 'Long Form Production'   },
  ];

  setTab(key: TabKey): void {
    this.activeTab = key;
  }

  openLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // ─────────────────────────────────────────────────────────────
  // PORTFOLIO DATA  ← edit here to update slides
  // picsum.photos seeds give stable, unique dummy images.
  // Replace with real CDN URLs before going live.
  //
  // HOW THE INFINITE SCROLL WORKS:
  // The template renders each array TWICE side-by-side inside a
  // flex container. A CSS @keyframes animation moves the strip
  // left by exactly 50% of its total width, then snaps back to 0
  // — creating a seamless, gapless infinite loop.
  // No JavaScript runs during the scroll — pure GPU compositing.
  // ─────────────────────────────────────────────────────────────

  // Portrait 9:16 — Reels
  reels: Slide[] = [
    { thumb: '/tn/drifto.png', heading: 'Drifto Media',       link: 'https://www.instagram.com/reel/DVBnZAcjMoD/?igsh=MWh3cjJ3dGxvbnpnZg==', alt: 'Drifto Signature' },
    { thumb: '/tn/tfl.png', heading: 'Real Estate',    link: 'https://www.instagram.com/reel/DKH4Gx1tQGC/?igsh=YnBuYXd3a3U0OXUz', alt: 'Real Estate' },
    { thumb: '/tn/tts.png', heading: 'Ambience Stories',           link: 'https://www.instagram.com/reel/DRXcA3tiDLp/?igsh=bXpoMTk1MHZod3Vp', alt: 'Ambience Stories' },
    { thumb: '/tn/do.png', heading: 'FNB',    link: 'https://www.instagram.com/reel/DUyI5VtiB4O/?igsh=MXI3bWk0eHI3azZrYg==', alt: 'FNB' },
    { thumb: '/tn/sushima.png', heading: 'BRAND STORY',       link: 'https://www.instagram.com/reel/DSXhv_8jH9Z/?igsh=MWVrcTR4dzNoZHdsaA==', alt: 'BRAND STORY' },
    { thumb: '/tn/osd.png', heading: 'FNB',    link: 'https://www.instagram.com/reel/DUtERPADf1N/?igsh=cWE3aGgzZG9zcGhi', alt: 'FNB' },
    { thumb: '/tn/tbk.png', heading: 'INTERVIEW SERIES',    link: 'https://www.instagram.com/reel/DQrh3etjBVP/?igsh=Ym5pd3JoN2czeXhu', alt: 'INTERVIEW SERIES' },

  ];

  // Square 1:1 — Social Media Creatives
  social: Slide[] = [
    { thumb: 'graphics/1.webp', heading: 'Campaign Grid — Adidas',    link: 'https://instagram.com', alt: 'Adidas social' },
    { thumb: 'graphics/2.webp', heading: 'Product Carousel — Zara',   link: 'https://instagram.com', alt: 'Zara social' },
    { thumb: 'graphics/3.webp', heading: 'Story Series — Swiggy',     link: 'https://instagram.com', alt: 'Swiggy social' },
    { thumb: 'graphics/4.webp', heading: 'Meme Campaign — Netflix',   link: 'https://instagram.com', alt: 'Netflix social' },
    { thumb: 'graphics/5.webp', heading: 'UGC Strategy — boAt',       link: 'https://instagram.com', alt: 'boAt social' },
    { thumb: 'graphics/6.webp', heading: 'Launch Grid — Nykaa',       link: 'https://instagram.com', alt: 'Nykaa social' },
    { thumb: 'graphics/7.webp', heading: 'Launch Grid — Nykaa',       link: 'https://instagram.com', alt: 'Nykaa social' },
    { thumb: 'graphics/8.webp', heading: 'Launch Grid — Nykaa',       link: 'https://instagram.com', alt: 'Nykaa social' },
  ];

  // Landscape 16:9 — Long Form
  longform: Slide[] = [
    { thumb: 'https://picsum.photos/seed/l1/710/400', heading: 'That\'s My Job',  link: 'https://www.youtube.com/watch?v=0sMOaFIjLq8', alt: 'Tata longform' },
    { thumb: 'https://picsum.photos/seed/l2/710/400', heading: 'Hanuman Mandir Tilak Nagar',  link: 'https://www.youtube.com/watch?v=NNvsOII05RE&t=154s', alt: 'Sony longform' },
  ];
}