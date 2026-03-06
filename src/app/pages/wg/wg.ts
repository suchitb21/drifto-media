import { Component, AfterViewInit, NgZone, ElementRef } from '@angular/core';
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

  /** Tracks which reels have had their src set (prevents re-download) */
  private loadedReels = new Set<number>();

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

      // --- Pause reel when it scrolls out of view ---
      const reelVideos = this.el.nativeElement.querySelectorAll('.display__reel-video');
      const reelObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            (entry.target as HTMLVideoElement).pause();
          }
        });
      }, { threshold: 0.1 });
      reelVideos.forEach((v: Element) => reelObserver.observe(v));
    });
  }

  /**
   * Toggle play / pause for a reel.
   * On first play the video src is set — no bytes downloaded until then.
   * Only one reel plays at a time.
   */
  toggleReel(index: number): void {
    const frames = this.el.nativeElement.querySelectorAll('.display__reel-frame');
    const frame = frames[index];
    if (!frame) return;
    const video = frame.querySelector('video') as HTMLVideoElement;
    if (!video) return;

    // Same reel & currently playing → pause
    if (this.activeReelIndex === index && !video.paused) {
      video.pause();
      this.activeReelIndex = null;
      return;
    }

    // Pause whatever is currently playing
    if (this.activeReelIndex !== null && this.activeReelIndex !== index) {
      const allReelVideos = this.el.nativeElement.querySelectorAll('.display__reel-video');
      allReelVideos.forEach((v: HTMLVideoElement) => v.pause());
    }

    // Lazy-load src on first play (zero download until user clicks)
    if (!this.loadedReels.has(index)) {
      video.src = this.reels[index].src;
      video.load();
      this.loadedReels.add(index);
    }

    video.muted = true;
    video.playsInline = true;
    const p = video.play();
    if (p) p.catch(() => {});
    this.activeReelIndex = index;
  }
}
