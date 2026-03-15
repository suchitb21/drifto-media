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
      department: 'Business Development',
      bio:        'Drives the agency’s growth by building strong client relationships, identifying new opportunities, and turning ideas into successful partnerships.',
      image:      '/founders/rakesh.jpeg',
      socials: {
        instagram: 'https://instagram.com',
        linkedin:  'https://linkedin.com',
      },
    },
    {
      name:       'Yuvraj Thadani',
      role:       'Co-Founder',
      department: 'Lead Editor',
      bio:        'The backbone of our production, transforming ideas into visually compelling stories through precision, creativity, and attention to every detail.',
      image:      '/founders/uv.jpeg',   // ← swap to /founder/2.webp
      socials: {
        instagram: 'https://instagram.com',
        linkedin:  'https://linkedin.com',
      },
    },
    {
      name:       'Hiten Kundaliya',
      role:       'Co-Founder',
      department: 'Creative Director',
      bio:        'Leads the creative vision of the agency, shaping ideas, concepts, and campaigns that help brands stand out and create meaningful.',
      image:      '/founders/hiten.jpeg',   // ← swap to /founder/3.webp
      socials: {
        linkedin: 'https://linkedin.com',
      },
    },
  ];
}