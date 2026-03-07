import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';


// ─────────────────────────────────────────────────────────────
// QUICK LINK INTERFACE
// Edit quickLinks array to update navigation links in footer
// ─────────────────────────────────────────────────────────────
interface QuickLink {
  label: string;
  href: string;
}

// ─────────────────────────────────────────────────────────────
// CONTACT ITEM INTERFACE
// Edit contacts array to update contact details in footer
// ─────────────────────────────────────────────────────────────
interface ContactItem {
  icon: 'email' | 'phone' | 'location';
  text: string;
  href?: string;        // optional — makes the item a clickable link
  subtext?: string;     // optional second line
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

  // ─────────────────────────────────────────────────────────────
  // QUICK LINKS  ← edit here to update footer nav
  // ─────────────────────────────────────────────────────────────
  quickLinks: QuickLink[] = [
    { label: 'Home',                  href: '/'              },
    { label: 'About Us',              href: '/about-us'         },
    { label: 'Portfolio',             href: '/portfolio'     },
    { label: 'Wedding Gallery',       href: '/wedding-gallery'},
  ];

  // ─────────────────────────────────────────────────────────────
  // CONTACT DETAILS  ← edit here to update contact info
  // We work remotely — no physical address shown
  // ─────────────────────────────────────────────────────────────
  contacts: ContactItem[] = [
    {
      icon: 'phone',
      text: '+91 93218 76981',
      subtext: 'Rakesh Bhatia'
    },
    {
      icon: 'phone',
      text: '+91 99678 04231',
      subtext: 'Hiten Kundaliya'
    },
    {
      icon: 'phone',
      text: '+91 90043 65297',
      subtext: 'Yuvraj Thadani'
    },
    {
      icon: 'email',
      text: 'driftomedia@gmail.com',
      href: 'mailto:driftomedia@gmail.com',
      subtext: 'For enquiries: '
    },
  ];

  // Current year auto-updates in the copyright line
  currentYear = new Date().getFullYear();
}