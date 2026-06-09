import React, { useState } from 'react';

export default function UpgradeToPro({ activeTab, setActiveTab }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleUpgrade = () => {
    showToast("Processing upgrade... Thank you for choosing SlideInto Pro! Redirecting...");
    setTimeout(() => {
      setActiveTab('dashboard');
    }, 2000);
  };

  return (
    <div className="bg-background text-on-surface antialiased flex min-h-screen w-full font-sans">
      <style dangerouslySetInnerHTML={{
        __html: `
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        
        /* Smooth scrolling for anchor links if any */
        html { scroll-behavior: smooth; }
        
        /* Hide scrollbar for sidebar but keep functionality */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `
      }} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center bg-surface-container-highest border border-outline px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md transition-all">
          <div className="h-2 w-2 rounded-full bg-primary mr-3 animate-ping" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Mobile Top Header (Visible only on small screens) */}
      <header className="md:hidden fixed top-0 w-full z-50 bg-surface-container-lowest border-b border-outline-variant h-16 flex items-center px-margin-mobile justify-between">
        <button 
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-3"
        >
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          <span className="font-title-md text-title-md font-bold text-on-surface">SlideInto</span>
        </button>
        <button 
          className="text-on-surface-variant hover:text-on-surface" 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </header>

      {/* SideNavBar (Shared Component) */}
      <aside 
        className={`bg-surface-container-lowest text-primary font-body-sm text-body-sm w-[240px] h-screen fixed left-0 top-0 border-r border-outline-variant flex flex-col p-6 z-40 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          </div>
          <div>
            <button 
              onClick={() => setActiveTab('landing')}
              className="font-title-md text-title-md font-bold text-on-surface leading-tight text-left"
            >
              SlideInto
            </button>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-tight">Ghostwriter AI</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow flex flex-col gap-2 overflow-y-auto no-scrollbar">
          <button 
            onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 text-left ${
              activeTab === 'dashboard' ? 'bg-secondary-container text-on-secondary-container font-semibold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </button>
          <button 
            onClick={() => { setActiveTab('generator'); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 text-left ${
              activeTab === 'generator' ? 'bg-secondary-container text-on-secondary-container font-semibold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined">bolt</span>
            Generate DM
          </button>
          <button 
            onClick={() => { setActiveTab('history'); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 text-left ${
              activeTab === 'history' ? 'bg-secondary-container text-on-secondary-container font-semibold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined">history</span>
            History
          </button>
          <button 
            onClick={() => { setActiveTab('bulk'); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 text-left ${
              activeTab === 'bulk' ? 'bg-secondary-container text-on-secondary-container font-semibold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined">rocket_launch</span>
            Bulk Mode
          </button>
          <button 
            onClick={() => { setActiveTab('extension'); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 text-left ${
              activeTab === 'extension' ? 'bg-secondary-container text-on-secondary-container font-semibold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined">extension</span>
            Chrome Extension
          </button>
          <button 
            onClick={() => { setActiveTab('settings'); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 text-left ${
              activeTab === 'settings' ? 'bg-secondary-container text-on-secondary-container font-semibold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined">settings</span>
            Settings
          </button>
        </nav>

        {/* CTA Widget */}
        <div className="mt-8 mb-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant">
          <p className="font-body-sm text-body-sm text-on-surface mb-2 font-medium">Currently on Starter</p>
          <div className="w-full bg-surface-variant rounded-full h-1.5 mb-2">
            <div className="bg-primary h-1.5 rounded-full" style={{ width: '100%' }}></div>
          </div>
          <p className="font-label-caps text-label-caps text-on-surface-variant mb-3">10/10 DMs Used</p>
          <button 
            onClick={() => setActiveTab('upgrade')}
            className={`w-full py-2 rounded-lg font-body-sm text-body-sm font-semibold transition-all ${
              activeTab === 'upgrade' 
                ? 'bg-primary text-on-primary shadow-inner cursor-default' 
                : 'bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary'
            }`}
          >
            Upgrade to Pro
          </button>
        </div>

        {/* Footer Links */}
        <div className="pt-4 border-t border-outline-variant flex flex-col gap-2">
          <button 
            onClick={() => { setActiveTab('help'); setIsMobileMenuOpen(false); }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors text-left"
          >
            <span className="material-symbols-outlined">help</span>
            Help Center
          </button>
          <button 
            onClick={() => { setActiveTab('landing'); setIsMobileMenuOpen(false); }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors text-left"
          >
            <span className="material-symbols-outlined">logout</span>
            Log Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      <div 
        className={`fixed inset-0 bg-on-surface/20 z-30 md:hidden backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={toggleMenu}
      ></div>

      {/* Main Content Canvas */}
      <main className="flex-1 ml-0 md:ml-[240px] pt-20 md:pt-0 min-h-screen relative pb-16">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        <div className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20">
          
          {/* Page Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="font-display-lg text-display-lg text-on-surface mb-4 tracking-tight">Unlock Your Outreach Potential</h1>
            <p className="font-title-md text-title-md text-on-surface-variant font-normal max-w-2xl mx-auto">
              Scale your networking with bulk automation, advanced tone matching, and unlimited history.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative z-10 animate-fade-in-up">
            
            {/* Starter Card (Current) */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex flex-col shadow-sm">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-title-md text-title-md text-on-surface">Starter</h2>
                  <span className="bg-surface-container-high text-on-surface-variant font-label-caps text-label-caps px-2 py-1 rounded">CURRENT</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display-lg text-display-lg text-on-surface">$0</span>
                  <span className="font-body-lg text-body-lg text-on-surface-variant">/mo</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Perfect for trying out the core features.</p>
              </div>
              
              <div className="flex-grow">
                <ul className="flex flex-col gap-4">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-outline mt-0.5 text-[20px]">check</span>
                    <span className="font-body-lg text-body-lg text-on-surface-variant">10 AI Generations per month</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-outline mt-0.5 text-[20px]">check</span>
                    <span className="font-body-lg text-body-lg text-on-surface-variant">Standard Tone AI</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-outline mt-0.5 text-[20px]">check</span>
                    <span className="font-body-lg text-body-lg text-on-surface-variant">30-day History Retention</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-50">
                    <span className="material-symbols-outlined text-outline-variant mt-0.5 text-[20px]">close</span>
                    <span className="font-body-lg text-body-lg text-on-surface-variant">Bulk Mode</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-50">
                    <span className="material-symbols-outlined text-outline-variant mt-0.5 text-[20px]">close</span>
                    <span className="font-body-lg text-body-lg text-on-surface-variant">Chrome Extension</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8">
                <button className="w-full py-3 px-4 rounded-lg border border-outline-variant text-on-surface-variant font-title-md text-title-md opacity-50 cursor-not-allowed bg-surface-container-low" disabled>
                  Your Active Plan
                </button>
              </div>
            </div>

            {/* Pro Card (Highlighted) */}
            <div className="bg-surface-container-lowest border-2 border-primary rounded-xl p-8 flex flex-col relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] transform md:-translate-y-4">
              {/* Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-on-primary font-label-caps text-label-caps px-4 py-1.5 rounded-full tracking-widest font-bold shadow-sm whitespace-nowrap">
                BEST VALUE
              </div>
              <div className="mb-8">
                <h2 className="font-title-md text-title-md text-primary mb-2 flex items-center gap-2">
                  Pro
                  <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                </h2>
                <div className="flex items-baseline gap-1">
                  <span className="font-display-lg text-display-lg text-on-surface">$79</span>
                  <span className="font-body-lg text-body-lg text-on-surface-variant">/mo</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Billed annually or $99 month-to-month.</p>
              </div>
              
              <div className="flex-grow">
                <p className="font-mono-label text-mono-label text-on-surface mb-4 uppercase tracking-wider text-opacity-70">Everything in Starter, plus:</p>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary mt-0.5 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="font-body-lg text-body-lg text-on-surface font-medium">Unlimited AI Generations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary mt-0.5 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="font-body-lg text-body-lg text-on-surface font-medium">Bulk Mode</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary mt-0.5 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="font-body-lg text-body-lg text-on-surface font-medium">Chrome Extension</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary mt-0.5 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="font-body-lg text-body-lg text-on-surface font-medium">Unlimited History</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary mt-0.5 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="font-body-lg text-body-lg text-on-surface font-medium">Advanced Tone AI</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary mt-0.5 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="font-body-lg text-body-lg text-on-surface font-medium">Priority Support</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8">
                <button 
                  onClick={handleUpgrade}
                  className="w-full py-3 px-4 rounded-lg bg-primary text-on-primary hover:bg-surface-tint font-title-md text-title-md hover:opacity-90 hover:shadow-md transition-all active:scale-[0.98] duration-150 flex items-center justify-center gap-2"
                >
                  Upgrade Now
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-32 max-w-3xl mx-auto pb-20 animate-fade-in-up">
            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-8 text-center">Frequently Asked Questions</h3>
            <div className="flex flex-col border-t border-outline-variant">
              
              <details className="group border-b border-outline-variant [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 py-6 font-title-md text-title-md text-on-surface hover:text-primary transition-colors">
                  What is Bulk Mode?
                  <span className="material-symbols-outlined shrink-0 transition duration-300 group-open:-rotate-180 text-outline">
                    expand_more
                  </span>
                </summary>
                <p className="font-body-lg text-body-lg text-on-surface-variant pb-6 pr-8 leading-relaxed">
                  Bulk Mode allows you to upload a CSV of LinkedIn profiles and automatically generate personalized connection requests or direct messages for all of them simultaneously, saving you hours of manual work.
                </p>
              </details>
              
              <details className="group border-b border-outline-variant [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 py-6 font-title-md text-title-md text-on-surface hover:text-primary transition-colors">
                  How does the Chrome Extension work?
                  <span className="material-symbols-outlined shrink-0 transition duration-300 group-open:-rotate-180 text-outline">
                    expand_more
                  </span>
                </summary>
                <p className="font-body-lg text-body-lg text-on-surface-variant pb-6 pr-8 leading-relaxed">
                  The extension integrates directly into your browser. When you visit a prospect's profile, SlideInto appears as a seamless sidebar allowing you to generate and send messages instantly without leaving the page.
                </p>
              </details>
              
              <details className="group border-b border-outline-variant [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 py-6 font-title-md text-title-md text-on-surface hover:text-primary transition-colors">
                  Can I cancel at any time?
                  <span className="material-symbols-outlined shrink-0 transition duration-300 group-open:-rotate-180 text-outline">
                    expand_more
                  </span>
                </summary>
                <p className="font-body-lg text-body-lg text-on-surface-variant pb-6 pr-8 leading-relaxed">
                  Yes, absolutely. If you choose the month-to-month plan, you can cancel your subscription at any time from your settings panel. Your access will remain active until the end of your current billing period.
                </p>
              </details>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
