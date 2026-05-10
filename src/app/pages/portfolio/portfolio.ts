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
    { thumb: '/tn/drifto.webp', heading: 'Drifto Media',       link: 'https://www.instagram.com/reel/DVBnZAcjMoD/?igsh=MWh3cjJ3dGxvbnpnZg==', alt: 'Drifto Signature' },
    { thumb: '/tn/tfl.webp', heading: 'Real Estate',    link: 'https://www.instagram.com/reel/DKH4Gx1tQGC/?igsh=YnBuYXd3a3U0OXUz', alt: 'Real Estate' },
    { thumb: '/tn/tts.webp', heading: 'Ambience Stories',           link: 'https://www.instagram.com/reel/DRXcA3tiDLp/?igsh=bXpoMTk1MHZod3Vp', alt: 'Ambience Stories' },
    { thumb: '/tn/do.webp', heading: 'F&B',    link: 'https://www.instagram.com/reel/DUyI5VtiB4O/?igsh=MXI3bWk0eHI3azZrYg==', alt: 'FNB' },
    { thumb: '/tn/sushima.webp', heading: 'BRAND STORY',       link: 'https://www.instagram.com/reel/DSXhv_8jH9Z/?igsh=MWVrcTR4dzNoZHdsaA==', alt: 'BRAND STORY' },
    { thumb: '/tn/osd.webp', heading: 'F&B',    link: 'https://www.instagram.com/reel/DUtERPADf1N/?igsh=cWE3aGgzZG9zcGhi', alt: 'FNB' },
    { thumb: '/tn/tbk.webp', heading: 'INTERVIEW SERIES',    link: 'https://www.instagram.com/reel/DQrh3etjBVP/?igsh=Ym5pd3JoN2czeXhu', alt: 'INTERVIEW SERIES' },
    { thumb: '/tn/pph1.webp', heading: 'INTERVIEW SERIES',    link: 'https://www.instagram.com/reel/DQrh3etjBVP/?igsh=Ym5pd3JoN2czeXhu', alt: 'INTERVIEW SERIES' },
    { thumb: '/tn/pph2.webp', heading: 'F&B',    link: 'https://www.instagram.com/reel/DX4St3AMCXJ/?igsh=MWI2cDJ3ZmZrYzlvMQ==', alt: 'PPH' },
    { thumb: '/tn/pph2.webp', heading: 'F&B',    link: 'https://www.instagram.com/reel/DXw-geAuizB/?igsh=MWNrNHJuMGh3aGJ1eA==', alt: 'PPH' },
  ];

  // Square 1:1 — Social Media Creatives (display only, no links)
  social: string[] = [
    'graphics/1.webp',
    'graphics/2.webp',
    'graphics/3.webp',
    'graphics/4.webp',
    'graphics/5.webp',
    'graphics/6.webp',
    'graphics/7.webp',
    'graphics/8.webp',
  ];

  // Landscape 16:9 — Long Form
  longform: Slide[] = [
    { thumb: '/lf2.jpeg', heading: 'That\'s My Job',  link: 'https://www.youtube.com/watch?v=0sMOaFIjLq8', alt: 'TMJ' },
    { thumb: '/lf1.jpeg', heading: 'Hanuman Mandir Tilak Nagar',  link: 'https://www.youtube.com/watch?v=NNvsOII05RE&t=154s', alt: 'HMTN' },
    { thumb: '/lf3.jpeg', heading: 'Bean Kaffe',  link: 'https://youtu.be/oME5nPi1jDM?feature=shared', alt: 'BK' },
  ];
}