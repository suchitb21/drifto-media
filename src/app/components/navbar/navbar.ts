import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  // ── State ──────────────────────────────────────────────────────
  /** True once the user scrolls past 50 % of viewport height */
  isScrolled = signal(false);

  /** True when the mobile hamburger menu is open */
  menuOpen = signal(false);

  // ── Scroll listener ────────────────────────────────────────────
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const threshold = window.innerHeight * 0.5; // 50 vh
    this.isScrolled.set(window.scrollY > threshold);
  }

  // ── Mobile menu toggle ─────────────────────────────────────────
  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  /** Close the menu when a nav link is clicked (mobile UX) */
  closeMenu(): void {
    this.menuOpen.set(false);
  }
}