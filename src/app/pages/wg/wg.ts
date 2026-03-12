import { Component, AfterViewInit, NgZone, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ReelItem {
  src: string;
  thumbnail: string;
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
    { src: '/wg/1.webm', thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400&auto=format&fit=crop' },
    { src: '/wg/2.webm', thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop' },
    { src: '/wg/3.webm', thumbnail: 'https://images.unsplash.com/photo-1532712938736-5e153c00c01d?q=80&w=400&auto=format&fit=crop' },
    { src: '/wg/4.webm', thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400&auto=format&fit=crop' },
    { src: '/wg/5.webm', thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop' },
    { src: '/wg/6.webm', thumbnail: 'https://images.unsplash.com/photo-1532712938736-5e153c00c01d?q=80&w=400&auto=format&fit=crop' },
  ];

  activeReelIndex: number | null = null;

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
