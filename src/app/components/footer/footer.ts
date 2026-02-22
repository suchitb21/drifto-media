import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

  // ─────────────────────────────────────────────────────────────
  // QUICK LINKS  ← edit here to update footer nav
  // ─────────────────────────────────────────────────────────────
  quickLinks: QuickLink[] = [
    { label: 'Home',                  href: '#'              },
    { label: 'About Us',              href: '#about'         },
    { label: 'Services',              href: '#services'      },
    { label: 'Portfolio',             href: '#portfolio'     },
    { label: 'Wedding Gallery',       href: '#wedding-gallery'},
    { label: 'Contact',               href: '#contact'       },
  ];

  // ─────────────────────────────────────────────────────────────
  // CONTACT DETAILS  ← edit here to update contact info
  // We work remotely — no physical address shown
  // ─────────────────────────────────────────────────────────────
  contacts: ContactItem[] = [
    {
      icon: 'phone',
      text: 'hello@yourbrand.com',
      href: 'mailto:hello@yourbrand.com'
    },
    {
      icon: 'phone',
      text: 'business@yourbrand.com',
      href: 'mailto:business@yourbrand.com'
    },
    {
      icon: 'phone',
      text: 'careers@yourbrand.com',
      href: 'mailto:careers@yourbrand.com',
      subtext: 'For job applications'
    },
    {
      icon: 'email',
      text: 'careers@yourbrand.com',
      href: 'mailto:careers@yourbrand.com',
      subtext: 'For job applications'
    },
  ];

  // Current year auto-updates in the copyright line
  currentYear = new Date().getFullYear();
}