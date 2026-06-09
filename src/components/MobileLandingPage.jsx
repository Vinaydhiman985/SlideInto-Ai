import React, { useEffect, useRef } from 'react';

export default function MobileLandingPage({ setActiveTab }) {
  const observerRef = useRef(null);

  useEffect(() => {
    // Add simple intersection observer to trigger animations on scroll
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start animation if it has delay
          entry.target.style.animationPlayState = 'running';
        }
      });
    });

    // Pause animations initially so they don't run before scrolling into view
    const animatedElements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in');
    animatedElements.forEach((el) => {
      el.style.animationPlayState = 'paused';
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="bg-background text-on-background antialiased selection:bg-primary-container selection:text-on-primary-container flex flex-col min-h-screen pt-16 w-full">
      <style dangerouslySetInnerHTML={{
        __html: `
        body { 
            font-family: 'Inter', sans-serif; 
            min-height: max(884px, 100dvh);
        }
        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
        @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseScale {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-pulse-scale { animation: pulseScale 2s infinite ease-in-out; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      `}} />

      {/* TopNavBar */}
      <nav className="bg-surface/80 dark:bg-surface/80 backdrop-blur-md fixed top-0 w-full border-b border-outline-variant/30 z-50">
        <div className="max-w-container-max mx-auto px-margin-mobile flex items-center justify-between h-16">
          {/* Brand */}
          <button 
            onClick={() => setActiveTab('landing')}
            className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary dark:text-primary-fixed cursor-pointer"
          >
            SlideInto
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setActiveTab('generator')}
            className="text-primary font-body-sm text-body-sm hover:opacity-80 transition-opacity cursor-pointer border border-primary/20 px-3 py-1.5 rounded-lg"
          >
            Login
          </button>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-container-max mx-auto px-margin-mobile pb-24 space-y-16 mt-8">
        
        {/* Hero Section */}
        <section className="w-full flex flex-col items-center text-center space-y-6 opacity-0 animate-fade-in">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface max-w-[320px] mx-auto">
            Turn links into presentations instantly.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[280px] mx-auto font-light">
            Paste a URL and watch our AI craft a professional slide deck in seconds. Perfect for busy professionals.
          </p>
          
          <div className="w-full max-w-md mx-auto space-y-4">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline" data-icon="link">link</span>
              <input 
                className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border border-surface-variant rounded-xl font-body-lg text-body-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary-container focus:border-transparent shadow-sm outline-none" 
                placeholder="Paste a URL here..." 
                type="url"
              />
            </div>
            <button 
              onClick={() => setActiveTab('generator')}
              className="w-full bg-primary text-on-primary py-4 rounded-xl font-title-md text-title-md flex items-center justify-center gap-2 hover:bg-surface-tint transition-colors shadow-sm animate-pulse-scale cursor-pointer"
            >
              Generate Deck
              <span className="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
            </button>
          </div>
        </section>

        {/* Features Bento Grid (Mobile optimized stack) */}
        <section className="w-full space-y-6">
          <h2 className="font-title-md text-title-md text-on-surface text-center mb-6">Why SlideInto?</h2>
          <div className="grid grid-cols-1 gap-4">
            
            {/* Card 1 */}
            <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 flex flex-col space-y-4 shadow-sm opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="w-12 h-12 bg-primary-fixed rounded-lg flex items-center justify-center text-primary">
                <span className="material-symbols-outlined" data-icon="bolt">bolt</span>
              </div>
              <h3 className="font-title-md text-title-md text-on-surface">Lightning Fast</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant font-light">
                Generates complete presentations in under 10 seconds. Stop wasting hours on formatting.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 flex flex-col space-y-4 shadow-sm opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="w-12 h-12 bg-tertiary-fixed rounded-lg flex items-center justify-center text-tertiary-container">
                <span className="material-symbols-outlined" data-icon="palette">palette</span>
              </div>
              <h3 className="font-title-md text-title-md text-on-surface">Pro Themes</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant font-light">
                Automatically applies beautiful, professional design systems to your content.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 flex flex-col space-y-4 shadow-sm opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <div className="w-12 h-12 bg-secondary-fixed rounded-lg flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined" data-icon="cloud_sync">cloud_sync</span>
              </div>
              <h3 className="font-title-md text-title-md text-on-surface">Export Anywhere</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant font-light">
                Download as PPTX, PDF, or share directly via Google Slides integration.
              </p>
            </div>
            
          </div>
        </section>

        {/* Social Proof Placeholder */}
        <section className="w-full text-center space-y-4 py-8 border-t border-surface-variant opacity-0 animate-fade-in" style={{ animationDelay: '800ms' }}>
          <p className="font-label-caps text-label-caps text-outline uppercase tracking-wider">Trusted by professionals at</p>
          <div className="flex flex-wrap justify-center gap-6 opacity-60">
            <span className="font-title-md text-title-md text-on-surface-variant font-bold">Acme Corp</span>
            <span className="font-title-md text-title-md text-on-surface-variant font-bold">Globex</span>
            <span className="font-title-md text-title-md text-on-surface-variant font-bold">Soylent</span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest dark:bg-surface-dim w-full border-t border-outline-variant/20 mt-auto">
        <div className="max-w-container-max mx-auto px-margin-mobile py-12 flex flex-col items-center justify-center gap-8">
          <div className="font-title-md text-title-md font-bold text-on-surface text-center">
            SlideInto
          </div>
          <div className="flex flex-wrap justify-center gap-4 font-body-sm text-body-sm">
            <a className="text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Terms of Service</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Contact</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Twitter</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">LinkedIn</a>
          </div>
          <div className="font-body-sm text-body-sm text-on-surface-variant text-center opacity-80 hover:opacity-100 transition-opacity">
            © 2024 SlideInto. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
