import React from 'react';

export default function HelpCenter({ activeTab, setActiveTab }) {
  return (
    <div className="bg-background text-on-background antialiased min-h-screen flex">
      <style dangerouslySetInnerHTML={{__html: `
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}} />

      {/* SideNavBar */}
      <nav className="hidden md:flex flex-col bg-surface-container-lowest dark:bg-surface-container-lowest border-r border-outline-variant w-[240px] h-screen fixed left-0 top-0 py-md px-sm z-40">
        <div className="flex items-center gap-3 mb-8 px-3">
          <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-lg">S</div>
          <div>
            <h1 className="font-headline-sm text-headline-sm font-bold text-primary leading-tight">SlideInto</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-tight">Ghostwriter AI</p>
          </div>
        </div>
        <div className="flex-grow flex flex-col gap-2 overflow-y-auto">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 text-left ${
              activeTab === 'dashboard' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            <span className="font-body-md text-body-md font-medium">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 text-left ${
              activeTab === 'generator' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">bolt</span>
            <span className="font-body-md text-body-md font-medium">Generate DM</span>
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 text-left ${
              activeTab === 'history' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">history</span>
            <span className="font-body-md text-body-md font-medium">History</span>
          </button>
          <button 
            onClick={() => setActiveTab('bulk')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 text-left ${
              activeTab === 'bulk' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
            <span className="font-body-md text-body-md font-medium">Bulk Mode</span>
          </button>
          <button 
            onClick={() => setActiveTab('extension')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 text-left ${
              activeTab === 'extension' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">extension</span>
            <span className="font-body-md text-body-md font-medium">Chrome Extension</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 text-left ${
              activeTab === 'settings' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span className="font-body-md text-body-md font-medium">Settings</span>
          </button>
        </div>
        <div className="mt-auto pt-6 flex flex-col gap-4 border-t border-outline-variant">
          <button className="w-full py-2 px-4 rounded-lg bg-primary-container text-on-primary text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
            Upgrade to Pro
          </button>
          <div className="flex flex-col gap-1">
            <button 
              onClick={() => setActiveTab('help')}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 text-left w-full ${
                activeTab === 'help' ? 'bg-secondary-container text-on-secondary-container font-medium' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">help</span>
              <span className="font-body-md text-body-md font-medium">Help Center</span>
            </button>
            <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors active:scale-95 duration-200" href="#">
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span className="font-body-md text-body-md font-medium">Log Out</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 md:ml-[240px] flex flex-col min-h-screen max-w-[100vw]">
        {/* Mobile Header Placeholder (Minimal) */}
        <div className="md:hidden flex items-center justify-between p-4 bg-surface-container-lowest border-b border-outline-variant z-30 sticky top-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-lg">S</div>
            <h1 className="font-headline-sm text-headline-sm font-bold text-primary">SlideInto</h1>
          </div>
          <div className="flex gap-2">
            {['generator', 'help'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs px-2.5 py-1 rounded ${activeTab === tab ? 'bg-secondary-container text-on-secondary-container font-medium' : 'text-on-surface-variant'}`}
              >
                {tab === 'generator' ? 'Generator' : 'Help'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 flex flex-col gap-12">
          
          {/* Hero Search Section */}
          <section className="bg-surface-container-low rounded-xl p-8 md:p-16 flex flex-col items-center justify-center text-center relative overflow-hidden border border-outline-variant/50 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
            <h2 className="font-display-lg text-display-lg text-on-surface mb-6 relative z-10">How can we help?</h2>
            <div className="w-full max-w-2xl relative z-10 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-on-surface-variant">search</span>
              </div>
              <input 
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-surface border border-outline-variant text-on-surface font-body-lg text-body-lg placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-secondary-fixed-dim focus:border-transparent transition-all shadow-sm" 
                placeholder="Search for articles, features, or troubleshooting..." 
                type="text"
              />
            </div>
          </section>

          {/* Categories Section (Bento Grid) */}
          <section className="flex flex-col gap-6">
            <h3 className="font-headline-lg text-headline-lg text-on-surface">Browse by Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Category Card 1 */}
              <a className="group bg-surface rounded-xl p-6 border border-outline-variant hover:border-outline hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all flex flex-col gap-4" href="#">
                <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                </div>
                <div>
                  <h4 className="font-title-md text-title-md text-on-surface mb-2">Getting Started</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Account setup, initial configuration, and basic platform navigation to get you sliding into DMs quickly.</p>
                </div>
              </a>

              {/* Category Card 2 */}
              <a className="group bg-surface rounded-xl p-6 border border-outline-variant hover:border-outline hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all flex flex-col gap-4" href="#">
                <div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed-variant group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
                </div>
                <div>
                  <h4 className="font-title-md text-title-md text-on-surface mb-2">Generating DMs</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Prompt engineering, understanding AI outputs, using variables, and tailoring messages for high conversion.</p>
                </div>
              </a>

              {/* Category Card 3 */}
              <a className="group bg-surface rounded-xl p-6 border border-outline-variant hover:border-outline hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all flex flex-col gap-4" href="#">
                <div className="w-12 h-12 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed-variant group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>database</span>
                </div>
                <div>
                  <h4 className="font-title-md text-title-md text-on-surface mb-2">Managing Credits</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Understanding credit consumption, limits per tier, rollover policies, and tracking your usage effectively.</p>
                </div>
              </a>

              {/* Category Card 4 */}
              <a className="group bg-surface rounded-xl p-6 border border-outline-variant hover:border-outline hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all flex flex-col gap-4 lg:col-span-2" href="#">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface group-hover:scale-105 transition-transform shrink-0">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>extension</span>
                  </div>
                  <div>
                    <h4 className="font-title-md text-title-md text-on-surface mb-2">Chrome Extension Guide</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant max-w-2xl">Full documentation on installing, configuring, and maximizing the workflow efficiency of our browser extension directly inside LinkedIn and Sales Navigator.</p>
                  </div>
                </div>
              </a>

              {/* Category Card 5 */}
              <a className="group bg-surface rounded-xl p-6 border border-outline-variant hover:border-outline hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all flex flex-col gap-4" href="#">
                <div className="w-12 h-12 rounded-lg bg-error-container flex items-center justify-center text-on-error-container group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
                </div>
                <div>
                  <h4 className="font-title-md text-title-md text-on-surface mb-2">Billing &amp; Account</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Invoices, payment methods, upgrading or downgrading your subscription plan securely.</p>
                </div>
              </a>

            </div>
          </section>

          {/* Popular Articles (Asymmetric List) */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-lg text-headline-lg text-on-surface">Popular Articles</h3>
              <a className="text-primary font-body-sm text-body-sm hover:underline font-medium flex items-center gap-1" href="#">
                View all <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <a className="flex items-center justify-between p-5 border-b border-outline-variant/50 hover:bg-surface-container-low transition-colors group" href="#">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">article</span>
                  <span className="font-body-lg text-body-lg text-on-surface font-medium">How to connect your LinkedIn account safely</span>
                </div>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-on-surface transition-colors">chevron_right</span>
              </a>
              <a className="flex items-center justify-between p-5 border-b border-outline-variant/50 hover:bg-surface-container-low transition-colors group" href="#">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">lightbulb</span>
                  <span className="font-body-lg text-body-lg text-on-surface font-medium">Tips for better AI DMs: Prompting for personalization</span>
                </div>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-on-surface transition-colors">chevron_right</span>
              </a>
              <a className="flex items-center justify-between p-5 border-b border-outline-variant/50 hover:bg-surface-container-low transition-colors group" href="#">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">troubleshoot</span>
                  <span className="font-body-lg text-body-lg text-on-surface font-medium">Extension not loading? Troubleshooting steps</span>
                </div>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-on-surface transition-colors">chevron_right</span>
              </a>
              <a className="flex items-center justify-between p-5 hover:bg-surface-container-low transition-colors group" href="#">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">credit_score</span>
                  <span className="font-body-lg text-body-lg text-on-surface font-medium">Understanding the Bulk Mode credit multiplier</span>
                </div>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-on-surface transition-colors">chevron_right</span>
              </a>
            </div>
          </section>

          {/* Support Footer Section */}
          <section className="mt-8 p-8 md:p-12 bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="flex flex-col gap-2 text-center md:text-left relative z-10">
              <h3 className="font-headline-lg text-headline-lg text-on-surface">Still need help?</h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Our support team is ready to assist you with any technical issues or billing questions.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto relative z-10">
              <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-surface border border-outline-variant text-on-surface font-body-sm text-body-sm font-medium hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[20px]">mail</span>
                Email Us
              </button>
              <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-primary-container text-on-primary font-body-sm text-body-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">chat</span>
                Live Chat
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
