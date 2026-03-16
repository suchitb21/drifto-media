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
      description: 'Delivering creative social media strategies, content ideas, and brand storytelling that help businesses build a strong digital presence.'
    },
    {
      value: 10,
      suffix: 'M+',
      label: 'Total Views',
      description: 'Creating engaging content that has collectively generated over 10 million views across our clients’ social media platforms.'
    },
    {
      value: 20,
      suffix: '+',
      label: 'Clients Served',
      description: 'Partnered with brands across F&B, religious, and service sectors to grow their online presence and drive real engagement.'
    }
  ];

  servicesData: ServiceItem[] = [
    {
      title: 'Strategy & Brand Positioning',
      description: 'We help brands find their unique voice and stand out in the digital crowd. With smart strategy, audience insights, and strong positioning, we shape how your brand is seen, remembered, and chosen online.',
      image: 'services/sbp.webp'
    },
    {
      title: 'Content Creation',
      description: 'We create content that’s made to stop the scroll and spark engagement. From reels and photos to trend-driven ideas, our team crafts visuals and stories that feel authentic, fresh, and perfectly aligned with your brand.',
      image: 'services/cc.webp'
    },
    {
      title: 'Social Media Management',
      description: 'We handle your social media so you can focus on your business. From posting and planning to engagement and growth, we manage your platforms with consistency, creativity, and strategies that keep your brand active, relevant, and growing online.',
      image: 'services/smm.webp'
    },
    {
      title: 'Performance Marketing',
      description: 'We run data-driven ad campaigns that focus on real results. From targeted ads to continuous optimization, we help your brand reach the right audience, drive quality leads, and turn clicks into measurable growth.',
      image: 'services/pm.webp'
    },
    {
      title: 'Website Development',
      description: 'We design clean, modern websites that not only look great but also work seamlessly. From user-friendly layouts to mobile-ready designs, we create websites that represent your brand well and turn visitors into customers',
      image: 'services/web-dev.webp'
    }
  ];

  // --- CLIENT LOGOS DATA ---
  clientLogos: string[] = [
    'logos/BEAN-KAFFEE.webp',
    'logos/CAARMAXX.webp',
    'logos/CRAZY-FOR-CHAI.webp',
    'logos/DROPOUTZ.webp',
    'logos/HEALTHY-CALORIES.webp',
    'logos/JINKIES-CAFE.webp',
    'logos/OH-SO-DILLI.webp',
    'logos/ROOTS.webp',
    'logos/SUSHIMA.webp',
    'logos/THATS-MY-JOB.webp',
    '/logos/11bg.png',
    '/logos/12bg.png',
  ];

  scrollToContact(event: Event) {
    event.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}