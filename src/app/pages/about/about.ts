import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// ─────────────────────────────────────────────────────────────
// FOUNDER INTERFACE
// Edit only the founders array to update all card content.
// ─────────────────────────────────────────────────────────────
interface Founder {
  name: string;
  role: string;        // "Founder" or "Co-Founder"
  department: string;  // area of expertise shown below name
  bio: string;         // 1–2 sentence blurb
  image: string;       // absolute path from /public/
  socials: {
    instagram?: string;
    linkedin?: string;
  };
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

  // ─────────────────────────────────────────────────────────────
  // FOUNDERS DATA  ← only edit here to update cards
  // Replace placeholder names, bios, and social URLs before launch.
  // Replace image paths with /founder/2.webp, /founder/3.webp etc.
  // ─────────────────────────────────────────────────────────────
  founders: Founder[] = [
    {
      name:       'Rakesh Bhatia',
      role:       'Co-Founder',
      department: 'Vision & Strategy',
      bio:        'The creative force behind it all. Alex turns raw ideas into brand stories that stick, scale, and convert across every platform.',
      image:      '/founders/rakesh.jpeg',
      socials: {
        instagram: 'https://instagram.com',
        linkedin:  'https://linkedin.com',
      },
    },
    {
      name:       'Yuvraj Thadani',
      role:       'Co-Founder',
      department: 'Content & Production',
      bio:        'Priya directs every frame with intention — from concept to final cut, nothing leaves without her eye on it.',
      image:      '/founders/uv.jpeg',   // ← swap to /founder/2.webp
      socials: {
        instagram: 'https://instagram.com',
        linkedin:  'https://linkedin.com',
      },
    },
    {
      name:       'Hiten Kundaliya',
      role:       'Co-Founder',
      department: 'Growth & Performance',
      bio:        'Jordan makes sure the work is seen. Paid media, analytics, and platform strategy — the engine behind every campaign.',
      image:      '/founders/hiten.jpeg',   // ← swap to /founder/3.webp
      socials: {
        linkedin: 'https://linkedin.com',
      },
    },
  ];
}