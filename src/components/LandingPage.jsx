import React, { useEffect, useRef } from 'react';

export default function LandingPage({ setActiveTab }) {
  const observerRef = useRef(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Typing Effect Logic
    const startTypingEffect = (textElement) => {
      if (!textElement || textElement.classList.contains('typed')) return;

      const originalText = textElement.getAttribute('data-original-text');
      if (!originalText) return;

      textElement.textContent = '';
      textElement.classList.add('typing-cursor');
      textElement.classList.add('typed');

      let i = 0;
      function typeChar() {
        if (i < originalText.length) {
          textElement.textContent += originalText.charAt(i);
          i++;
          // Randomize typing speed slightly for realism
          setTimeout(typeChar, Math.random() * 20 + 10);
        } else {
          setTimeout(() => {
            textElement.classList.remove('typing-cursor');
          }, 1000);
        }
      }
      // Small initial delay
      setTimeout(typeChar, 500);
    };

    if (!prefersReducedMotion) {
      // Intersection Observer for fade-in animations
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              
              // Trigger typing effect when preview card comes into view
              const typingEl = entry.target.querySelector('#typing-dm');
              if (typingEl) {
                startTypingEffect(typingEl);
              }
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      document.querySelectorAll('.fade-in-up').forEach((element) => {
        observerRef.current.observe(element);
      });
    } else {
      // Make all elements visible immediately if motion is reduced
      document.querySelectorAll('.fade-in-up').forEach((element) => {
        element.classList.add('visible');
        element.style.opacity = '1';
        element.style.transform = 'none';
      });
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-lg antialiased min-h-screen flex flex-col w-full">
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (prefers-reduced-motion: no-preference) {
            .fade-in-up { opacity: 0; transform: translateY(20px); transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
            .fade-in-up.visible { opacity: 1; transform: translateY(0); }
            
            .stagger-1 { transition-delay: 0.1s; }
            .stagger-2 { transition-delay: 0.2s; }
            .stagger-3 { transition-delay: 0.3s; }
            .stagger-4 { transition-delay: 0.4s; }

            .hover-lift { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
            .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 10px 25px -5px rgba(63, 64, 199, 0.15), 0 8px 10px -6px rgba(63, 64, 199, 0.05); }
        }
        
        .typing-cursor::after {
            content: '|';
            animation: blink 1s step-start infinite;
            color: var(--color-primary);
        }
        @keyframes blink { 50% { opacity: 0; } }
        
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        `
      }} />

      {/* TopNavBar */}
      <nav className="bg-surface/80 dark:bg-surface/80 backdrop-blur-md fixed top-0 w-full border-b border-outline-variant/30 z-50">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between h-16">
          <div className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary dark:text-primary-fixed">
            SlideInto
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-low px-3 py-2 rounded-lg" href="#features">Features</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-low px-3 py-2 rounded-lg" href="#pricing">Pricing</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-low px-3 py-2 rounded-lg" href="#about">About</a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('generator')}
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary hidden md:block cursor-pointer"
            >
              Login
            </button>
            <button 
              onClick={() => setActiveTab('generator')}
              className="bg-primary text-on-primary font-body-sm text-body-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity hover-lift cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 flex-1">
        {/* Hero Section */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display-lg text-display-lg text-on-surface mb-6 leading-tight fade-in-up stagger-1">
              Cold DMs that don't sound cold.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-2xl mx-auto fade-in-up stagger-2">
              Analyze prospect profiles instantly and generate highly personalized outreach that actually gets replies.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto bg-surface p-2 rounded-full border border-outline-variant/50 shadow-sm focus-within:ring-2 focus-within:ring-secondary-container transition-all fade-in-up stagger-3">
              <input className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface font-body-sm text-body-sm w-full px-4 outline-none" placeholder="Paste LinkedIn or X profile URL..." type="url" />
              <button 
                onClick={() => setActiveTab('generator')}
                className="bg-primary text-on-primary font-body-sm text-body-sm px-6 py-3 rounded-full hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-colors whitespace-nowrap w-full sm:w-auto hover-lift cursor-pointer"
              >
                Analyze Profile
              </button>
            </div>
          </div>

          {/* Floating Preview Card */}
          <div className="mt-16 max-w-2xl mx-auto bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-lg p-6 relative overflow-hidden fade-in-up stagger-4">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-container to-primary"></div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex-shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-outline">person</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-title-md text-title-md text-on-surface">Alex Chen</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Founder @ TechStart</p>
                  </div>
                  <span className="bg-secondary-container/20 text-on-secondary-container px-2 py-1 rounded font-mono-label text-mono-label flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">bolt</span> 98% Match
                  </span>
                </div>
                <div className="bg-surface p-4 rounded-lg border border-outline-variant/20 mt-4 relative min-h-[100px]">
                  <p 
                    className="font-body-sm text-body-sm text-on-surface-variant italic" 
                    id="typing-dm" 
                    data-original-text='"Hey Alex, loved your recent post on sustainable scaling. Noticed TechStart is hiring engineers - thought I&apos;d share a resource we use to find pre-vetted senior devs. Open to a quick chat?"'
                  >
                    "Hey Alex, loved your recent post on sustainable scaling. Noticed TechStart is hiring engineers - thought I'd share a resource we use to find pre-vetted senior devs. Open to a quick chat?"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="bg-surface py-20 mt-12">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <h2 className="font-headline-lg text-headline-lg text-center mb-16 fade-in-up">How it works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center fade-in-up stagger-1">
                <div className="w-16 h-16 bg-surface-container-lowest rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-outline-variant/20">
                  <span className="material-symbols-outlined text-primary text-3xl">link</span>
                </div>
                <h3 className="font-title-md text-title-md mb-2">1. Connect</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Drop a profile link or sync your CRM.</p>
              </div>
              <div className="text-center relative fade-in-up stagger-2">
                <div className="hidden md:block absolute top-8 left-0 w-full h-[1px] bg-outline-variant/30 -z-10"></div>
                <div className="w-16 h-16 bg-surface-container-lowest rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-outline-variant/20">
                  <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
                </div>
                <h3 className="font-title-md text-title-md mb-2">2. Analyze</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">AI extracts interests, recent posts, and tone.</p>
              </div>
              <div className="text-center relative fade-in-up stagger-3">
                <div className="hidden md:block absolute top-8 left-0 w-full h-[1px] bg-outline-variant/30 -z-10"></div>
                <div className="w-16 h-16 bg-surface-container-lowest rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-outline-variant/20">
                  <span className="material-symbols-outlined text-primary text-3xl">send</span>
                </div>
                <h3 className="font-title-md text-title-md mb-2">3. Send</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Generate and send hyper-personalized DMs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24" id="features">
          <h2 className="font-headline-lg text-headline-lg text-center mb-16 fade-in-up">Powerful features for seamless outreach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm transition-shadow fade-in-up stagger-1 hover-lift">
              <span className="material-symbols-outlined text-primary mb-4 text-2xl">tune</span>
              <h3 className="font-title-md text-title-md mb-2">Tone Personalization</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Match your prospect's communication style automatically.</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm transition-shadow fade-in-up stagger-2 hover-lift">
              <span className="material-symbols-outlined text-primary mb-4 text-2xl">hub</span>
              <h3 className="font-title-md text-title-md mb-2">Multi-Platform</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Works flawlessly across X (Twitter) and LinkedIn.</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm transition-shadow fade-in-up stagger-3 hover-lift">
              <span className="material-symbols-outlined text-primary mb-4 text-2xl">auto_awesome_motion</span>
              <h3 className="font-title-md text-title-md mb-2">Bulk Ghostwriting</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Upload a list and generate 100s of unique drafts instantly.</p>
            </div>
          </div>
        </section>

        {/* Result Showcase */}
        <section className="bg-surface py-24 fade-in-up">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <h2 className="font-headline-lg text-headline-lg text-center mb-16">The Difference is in the Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Standard DM */}
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 opacity-70">
                <div className="flex items-center gap-2 mb-4 border-b border-outline-variant/20 pb-4">
                  <span className="material-symbols-outlined text-error">close</span>
                  <h3 className="font-title-md text-title-md">Standard DM</h3>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">"Hi there, I see you work in tech. We offer B2B lead generation services that can 10x your revenue. Let's book a call."</p>
              </div>
              {/* SlideInto DM */}
              <div className="bg-surface-container-lowest p-6 rounded-xl border-2 border-secondary-container shadow-md relative hover-lift">
                <div className="absolute -top-3 -right-3 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-caps text-label-caps">WINNER</div>
                <div className="flex items-center gap-2 mb-4 border-b border-outline-variant/20 pb-4">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <h3 className="font-title-md text-title-md">SlideInto DM</h3>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface">"Hey Alex, loved your take on the current AI landscape in your last post. Noticed TechStart is expanding the engineering team—we help startups like yours find pre-vetted senior devs without the agency bloat. Open to a quick chat next week?"</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24 fade-in-up" id="pricing">
          <h2 className="font-headline-lg text-headline-lg text-center mb-16">Simple Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic */}
            <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30 flex flex-col hover-lift transition-all duration-300">
              <h3 className="font-title-md text-title-md mb-2">Starter</h3>
              <div className="font-display-lg text-display-lg mb-6">$29<span className="font-body-sm text-body-sm text-on-surface-variant">/mo</span></div>
              <ul className="mb-8 flex-1 space-y-4">
                <li className="flex items-center gap-2 font-body-sm text-body-sm"><span className="material-symbols-outlined text-primary text-[18px]">check</span> 100 Profiles/mo</li>
                <li className="flex items-center gap-2 font-body-sm text-body-sm"><span className="material-symbols-outlined text-primary text-[18px]">check</span> Basic Tone Matching</li>
              </ul>
              <button 
                onClick={() => setActiveTab('generator')}
                className="w-full bg-surface text-on-surface border border-outline-variant/50 font-body-sm text-body-sm px-4 py-2 rounded-lg hover:bg-surface-container-low transition-colors hover-lift cursor-pointer"
              >
                Choose Starter
              </button>
            </div>
            {/* Pro */}
            <div className="bg-surface-container-lowest p-8 rounded-xl border-2 border-primary shadow-lg relative flex flex-col transform md:-translate-y-4 hover-lift transition-all duration-300">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-on-primary px-3 py-1 rounded-full font-label-caps text-label-caps">POPULAR</div>
              <h3 className="font-title-md text-title-md mb-2">Pro</h3>
              <div className="font-display-lg text-display-lg mb-6">$79<span className="font-body-sm text-body-sm text-on-surface-variant">/mo</span></div>
              <ul className="mb-8 flex-1 space-y-4">
                <li className="flex items-center gap-2 font-body-sm text-body-sm"><span className="material-symbols-outlined text-primary text-[18px]">check</span> 1000 Profiles/mo</li>
                <li className="flex items-center gap-2 font-body-sm text-body-sm"><span className="material-symbols-outlined text-primary text-[18px]">check</span> Advanced Tone Personalization</li>
                <li className="flex items-center gap-2 font-body-sm text-body-sm"><span className="material-symbols-outlined text-primary text-[18px]">check</span> CRM Integration</li>
              </ul>
              <button 
                onClick={() => setActiveTab('generator')}
                className="w-full bg-primary text-on-primary font-body-sm text-body-sm px-4 py-3 rounded-lg hover:bg-primary-fixed-dim transition-colors hover-lift cursor-pointer"
              >
                Get Pro
              </button>
            </div>
            {/* Enterprise */}
            <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30 flex flex-col hover-lift transition-all duration-300">
              <h3 className="font-title-md text-title-md mb-2">Enterprise</h3>
              <div className="font-display-lg text-display-lg mb-6">Custom</div>
              <ul className="mb-8 flex-1 space-y-4">
                <li className="flex items-center gap-2 font-body-sm text-body-sm"><span className="material-symbols-outlined text-primary text-[18px]">check</span> Unlimited Profiles</li>
                <li className="flex items-center gap-2 font-body-sm text-body-sm"><span className="material-symbols-outlined text-primary text-[18px]">check</span> Dedicated API</li>
                <li className="flex items-center gap-2 font-body-sm text-body-sm"><span className="material-symbols-outlined text-primary text-[18px]">check</span> Priority Support</li>
              </ul>
              <button 
                onClick={() => setActiveTab('generator')}
                className="w-full bg-surface text-on-surface border border-outline-variant/50 font-body-sm text-body-sm px-4 py-2 rounded-lg hover:bg-surface-container-low transition-colors hover-lift cursor-pointer"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24 fade-in-up">
          <div className="bg-primary-container text-on-primary-container rounded-2xl p-12 text-center max-w-4xl mx-auto shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none"></div>
            <h2 className="font-headline-lg text-headline-lg mb-6 relative z-10">Ready to slide in?</h2>
            <p className="font-body-lg text-body-lg mb-8 opacity-90 max-w-2xl mx-auto relative z-10">
              Start sending highly personalized outreach today. No credit card required for your first 50 DMs.
            </p>
            <button 
              onClick={() => setActiveTab('generator')}
              className="bg-on-primary text-primary font-title-md text-title-md px-8 py-4 rounded-xl hover:bg-surface-container-lowest transition-colors relative z-10 shadow-sm hover-lift cursor-pointer"
            >
              Start Free Trial
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest dark:bg-surface-dim border-t border-outline-variant/20 w-full mt-auto">
        <div className="max-w-container-max mx-auto px-margin-desktop py-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-title-md text-title-md font-bold text-on-surface">SlideInto</div>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100 hover:underline" href="#">Privacy Policy</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100 hover:underline" href="#">Terms of Service</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100 hover:underline" href="#">Contact</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100 hover:underline" href="#">Twitter</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100 hover:underline" href="#">LinkedIn</a>
          </div>
          <div className="font-body-sm text-body-sm text-on-surface-variant">© 2024 SlideInto. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
