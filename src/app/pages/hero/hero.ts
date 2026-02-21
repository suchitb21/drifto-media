import { Component, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountUpDirective } from 'ngx-countup';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

interface ServiceItem {
  title: string;
  description: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, CountUpDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements AfterViewInit {

  // 1. Inject NgZone to protect performance
  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    // 2. Run outside Angular to prevent CPU spikes and video stuttering
    this.ngZone.runOutsideAngular(() => {

      // --- 1. STATS FADE-UP OBSERVER ---
      const wrapperEl = document.querySelector('.stats-section-wrapper');
      const statsEl = document.querySelector('.stats-section');

      if (wrapperEl && statsEl) {
        const statsObserver = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              statsEl.classList.add('is-visible');
            } else {
              statsEl.classList.remove('is-visible');
            }
          },
          { threshold: 0.15 } 
        );
        statsObserver.observe(wrapperEl);
      }

      // --- 2. VIDEO ANTI-FREEZE OBSERVER ---
      // Fixes the issue where browsers pause off-screen videos and forget to resume them
      const videos = document.querySelectorAll('video');
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const video = entry.target as HTMLVideoElement;
          
          if (entry.isIntersecting) {
            // Force play when the video enters the screen
            video.play().catch(e => console.log('Autoplay prevented by browser:', e));
          } else {
            // Be a good citizen and pause it when hidden to save battery/CPU
            video.pause(); 
          }
        });
      }, { threshold: 0.05 }); // Triggers when just 5% of the video is visible

      videos.forEach(v => videoObserver.observe(v));

    });
  }

  // --- COMPONENT DATA ---
  
  countUpOpts = {
    duration: 2.5,
    separator: ',',
    enableScrollSpy: true,
    scrollSpyDelay: 300,
  };

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
      description: 'We dig deep into your brand DNA to craft a positioning strategy that cuts through the noise. From audience research to competitive analysis, we build the foundation that makes everything else work.'
    },
    {
      title: 'Content Creation',
      description: 'From scroll-stopping reels to thumb-halting carousels — we create platform-native content that your audience actually wants to watch, share, and save. No stock photos, no lazy captions.'
    },
    {
      title: 'Social Media Management',
      description: 'We take the wheel on your socials end-to-end. Scheduling, community management, trend-jacking, and reporting — so you can focus on running your business while we grow your audience.'
    },
    {
      title: 'Performance Marketing',
      description: 'Paid ads that don\'t just burn budget. We run data-driven campaigns across Meta, Google, and TikTok built to convert — with constant optimisation to keep your cost-per-result dropping.'
    },
    {
      title: 'Website Development',
      description: 'Fast, modern, and built to convert. We design and develop websites that tell your brand story and turn visitors into customers — with clean code and zero bloat.'
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