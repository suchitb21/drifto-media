import { Component, AfterViewInit, NgZone, ElementRef } from '@angular/core';

@Component({
  selector: 'app-wg',
  imports: [],
  templateUrl: './wg.html',
  styleUrl: './wg.css',
})
export class Wg implements AfterViewInit {

  constructor(private ngZone: NgZone, private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      const video = this.el.nativeElement.querySelector('.wg__video') as HTMLVideoElement;
      if (!video) return;

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

      observer.observe(video);
    });
  }
}
