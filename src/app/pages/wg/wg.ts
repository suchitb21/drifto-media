import { Component, AfterViewInit, NgZone, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ReelItem {
  src: string;
  thumbnail: string;
  landscape?: boolean;
}

@Component({
  selector: 'app-wg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wg.html',
  styleUrl: './wg.css',
})
export class Wg implements AfterViewInit {

  /* ── Reel data — add / remove entries to update the grid ── */
  reels: ReelItem[] = [
    { src: '/wg/1.webm', thumbnail: '/wg/tn/1.webp' },
    { src: '/wg/2.webm', thumbnail: '/wg/tn/2.webp' },
    { src: '/wg/3.webm', thumbnail: '/wg/tn/3.webp' },
    { src: '/wg/4.webm', thumbnail: '/wg/tn/4.webp' },
    { src: '/wg/5.webm', thumbnail: '/wg/tn/5.webp' },
    { src: '/wg/6.webm', thumbnail: '/wg/tn/6.webp' },
    { src: '/wg/7.webm', thumbnail: '/wg/tn/8.webp', landscape: true },
    { src: '/wg/8.webm', thumbnail: '/wg/tn/7.webp', landscape: true },
  ];

  activeReelIndex: number | null = null;

  /** Filtered views with original index preserved */
  get portraitReels() {
    return this.reels
      .map((r, i) => ({ ...r, index: i }))
      .filter(r => !r.landscape);
  }

  get landscapeReels() {
    return this.reels
      .map((r, i) => ({ ...r, index: i }))
      .filter(r => r.landscape);
  }

  get isActiveReelLandscape(): boolean {
    return this.activeReelIndex !== null && !!this.reels[this.activeReelIndex]?.landscape;
  }

  /** Tracks which reels have been loaded into the modal (prevents re-download) */
  private lastLoadedSrc = '';

  @ViewChild('modalVideo') modalVideoRef!: ElementRef<HTMLVideoElement>;

  constructor(private ngZone: NgZone, private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      // --- Hero video autoplay observer ---
      const heroVideo = this.el.nativeElement.querySelector('.wg__video') as HTMLVideoElement;
      if (heroVideo) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const v = entry.target as HTMLVideoElement;
            if (entry.isIntersecting) {
              v.muted = true;
              v.defaultMuted = true;
              v.playsInline = true;
              const playPromise = v.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {
                  const forcePlay = () => {
                    v.play();
                    window.removeEventListener('scroll', forcePlay);
                    window.removeEventListener('click', forcePlay);
                    window.removeEventListener('touchstart', forcePlay);
                  };
                  window.addEventListener('scroll', forcePlay, { passive: true });
                  window.addEventListener('click', forcePlay, { passive: true });
                  window.addEventListener('touchstart', forcePlay, { passive: true });
                });
              }
            } else {
              v.pause();
            }
          });
        }, { threshold: 0.05 });
        observer.observe(heroVideo);
      }
    });
  }

  /** Open modal, lazy-load src, play with sound */
  openReel(index: number): void {
    const video = this.modalVideoRef?.nativeElement;
    if (!video) return;

    this.activeReelIndex = index;
    const reel = this.reels[index];

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Load src only if different from what's already loaded
    if (this.lastLoadedSrc !== reel.src) {
      video.src = reel.src;
      video.load();
      this.lastLoadedSrc = reel.src;
    }

    video.muted = false;
    video.playsInline = true;
    const p = video.play();
    if (p) p.catch(() => {});
  }

  /** Close modal, pause video, restore scroll */
  closeReel(): void {
    const video = this.modalVideoRef?.nativeElement;
    if (video) {
      video.pause();
    }
    this.activeReelIndex = null;
    document.body.style.overflow = '';
  }

  /** ESC key closes the modal */
  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.activeReelIndex !== null) {
      this.closeReel();
    }
  }
}
