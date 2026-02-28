import { Component, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

interface ServiceItem {
  title: string;
  description: string;
  image: string; // ← add this
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule], // Removed CountUpDirective
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements AfterViewInit {

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    // Run outside Angular to prevent CPU spikes
    this.ngZone.runOutsideAngular(() => {

      // --- 1. STATS FADE-UP & COUNTER OBSERVER ---
      const wrapperEl = document.querySelector('.stats-section-wrapper');
      const statsEl = document.querySelector('.stats-section');
      const numberElements = document.querySelectorAll('.stat-block__number');

      if (wrapperEl && statsEl) {
        const statsObserver = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              statsEl.classList.add('is-visible');

              // Only run the counting animation ONCE when scrolled into view
              if (!statsEl.classList.contains('has-counted')) {
                statsEl.classList.add('has-counted');

                const duration = 2500; // 2.5 seconds duration
                
                numberElements.forEach((el) => {
                  const htmlEl = el as HTMLElement;
                  const target = parseInt(htmlEl.getAttribute('data-target') || '0', 10);
                  let startTimestamp: number | null = null;

                  const step = (timestamp: number) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    
                    // Ease-out equation for a smooth slow-down at the end
                    const easeOut = 1 - Math.pow(1 - progress, 4); 
                    const current = Math.floor(easeOut * target);

                    // Update the DOM directly, bypassing Angular entirely
                    htmlEl.innerText = current.toString();

                    if (progress < 1) {
                      window.requestAnimationFrame(step);
                    } else {
                      htmlEl.innerText = target.toString(); // Ensure exact final number
                    }
                  };

                  window.requestAnimationFrame(step);
                });
              }
            } else {
              statsEl.classList.remove('is-visible');
            }
          },
          { threshold: 0.15 } 
        );
        statsObserver.observe(wrapperEl);
      }

// --- 2. VIDEO ANTI-FREEZE OBSERVER ---
      const videos = document.querySelectorAll('video');
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const video = entry.target as HTMLVideoElement;
          
          if (entry.isIntersecting) {
            // 1. Force the DOM properties to prove to the browser it is silent
            video.muted = true;
            video.defaultMuted = true;
            video.playsInline = true;

            // 2. Attempt to play and catch the promise
            const playPromise = video.play();
            
            if (playPromise !== undefined) {
              playPromise.catch(error => {
                // 3. THE FALLBACK: If the browser blocks it on page load, 
                // instantly start the video the second they scroll or click.
                const forcePlay = () => {
                  video.play();
                  // Clean up listeners once it successfully starts
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
            video.pause(); 
          }
        });
      }, { threshold: 0.05 });

      videos.forEach(v => videoObserver.observe(v));

    });
  }

  // --- COMPONENT DATA ---

  statsData: StatItem[] = [
    {
      value: 3,
      suffix: '+',
      label: 'Years Experience',
      description: 'Delivering high-quality video solutions consistently over the years with proven expertise.'
    },
    {
      value: 10,
      suffix: 'M+',
      label: 'Total Views',
      description: 'Creating engaging content that resonates with massive audiences across platforms worldwide.'
    },
    {
      value: 20,
      suffix: '+',
      label: 'Clients Served',
      description: 'Trusted by a diverse range of clients to bring their creative visions to life effectively.'
    }
  ];

  servicesData: ServiceItem[] = [
    {
      title: 'Strategy & Brand Positioning',
      description: 'We dig deep into your brand DNA to craft a positioning strategy that cuts through the noise. From audience research to competitive analysis, we build the foundation that makes everything else work.',
      image: 'services/sbp.webp'
    },
    {
      title: 'Content Creation',
      description: 'From scroll-stopping reels to thumb-halting carousels — we create platform-native content that your audience actually wants to watch, share, and save. No stock photos, no lazy captions.',
      image: 'services/cc.webp'
    },
    {
      title: 'Social Media Management',
      description: 'We take the wheel on your socials end-to-end. Scheduling, community management, trend-jacking, and reporting — so you can focus on running your business while we grow your audience.',
      image: 'services/smm.webp'
    },
    {
      title: 'Performance Marketing',
      description: 'Paid ads that don\'t just burn budget. We run data-driven campaigns across Meta, Google, and TikTok built to convert — with constant optimisation to keep your cost-per-result dropping.',
      image: 'services/pm.webp'
    },
    {
      title: 'Website Development',
      description: 'Fast, modern, and built to convert. We design and develop websites that tell your brand story and turn visitors into customers — with clean code and zero bloat.',
      image: 'services/web-dev.webp'
    }
  ];

  scrollToContact(event: Event) {
    event.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}