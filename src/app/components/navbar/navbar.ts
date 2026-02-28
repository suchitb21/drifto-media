import { Component, HostListener, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  // ── State ──────────────────────────────────────────────────────
  isScrolled = signal(false);
  menuOpen = signal(false);
  
  // Track if the user is on the home page
  isHomePage = signal(true); 

  private router = inject(Router);

  // ── Initialization ─────────────────────────────────────────────
  ngOnInit() {
    // Listen to route changes to determine the current page
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.checkIfHome(event.urlAfterRedirects);
    });

    // Initial check on load
    this.checkIfHome(this.router.url);
  }

  // Helper function to handle routing logic
  private checkIfHome(url: string) {
    // Strip out hash fragments (like #about) so we only check the base path
    const path = url.split('?')[0].split('#')[0];
    const isHome = path === '/' || path === '';
    
    this.isHomePage.set(isHome);

    // If NOT on the home page, force the navbar to be solid permanently
    if (!isHome) {
      this.isScrolled.set(true);
    } else {
      // If back on the home page, evaluate scroll position normally
      this.onWindowScroll();
    }
  }

  // ── Scroll listener ────────────────────────────────────────────
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Override: If not on home page, do nothing (keep it solid)
    if (!this.isHomePage()) {
      this.isScrolled.set(true);
      return;
    }

    // Normal home page behavior: transparent until 50vh
    const threshold = window.innerHeight * 0.5; 
    this.isScrolled.set(window.scrollY > threshold);
  }

  // ── Mobile menu toggle ─────────────────────────────────────────
  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}