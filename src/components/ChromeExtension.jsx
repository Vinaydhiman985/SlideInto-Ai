import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ChromeExtension() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const activePath = location.pathname;

  return (
    <div className="bg-background text-on-background antialiased flex min-h-screen w-full font-sans">
      <style dangerouslySetInnerHTML={{__html: `
        .glass-card {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(0, 0, 0, 0.08);
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}} />

      {/* SideNavBar */}
      <nav className="hidden md:flex w-[240px] h-screen fixed left-0 top-0 border-r border-outline-variant bg-surface-container-lowest flex-col py-6 px-4 z-40">
        {/* Header */}
        <div className="mb-8 px-2 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>electric_bolt</span>
          </div>
          <div>
            <h1 className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">SlideInto</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant -mt-1">Ghostwriter AI</p>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className="flex-grow flex flex-col gap-1">
          {[
            { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
            { path: '/generator', label: 'Generate DM', icon: 'bolt' },
            { path: '/history', label: 'History', icon: 'history' },
            { path: '/bulk', label: 'Bulk Mode', icon: 'rocket_launch', pro: true },
            { path: '/extension', label: 'Chrome Extension', icon: 'extension' },
            { path: '/settings', label: 'Settings', icon: 'settings', mt: 'mt-auto' }
          ].map((item, idx) => {
            const isActive = activePath === item.path;
            return (
              <button 
                key={idx}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 font-body-sm text-body-sm text-left ${item.mt || ''} ${
                  isActive ? 'bg-secondary-container text-on-secondary-container font-medium' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.label}
                {item.pro && (
                  <span className="ml-auto bg-primary text-on-primary text-[9px] px-1.5 py-0.2 rounded font-bold">PRO</span>
                )}
              </button>
            )
          })}
        </div>
        
        {/* Footer Actions */}
        <div className="mt-4 pt-4 border-t border-outline-variant flex flex-col gap-1">
          <button 
            onClick={() => navigate('/help')}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors active:scale-95 duration-200 font-body-sm text-body-sm text-left w-full"
          >
            <span className="material-symbols-outlined text-[20px]">help</span>
            Help Center
          </button>
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors active:scale-95 duration-200 font-body-sm text-body-sm text-left w-full"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Log Out
          </button>
        </div>
        
        {/* CTA */}
        <div className="mt-6 px-2">
          <button 
            onClick={() => navigate('/upgrade')}
            className="w-full bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors py-2 px-4 rounded-xl border border-outline-variant font-body-sm text-body-sm font-medium flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">stars</span>
            Upgrade to Pro
          </button>
        </div>
      </nav>

      {/* TopAppBar (Mobile Only) */}
      <header className="md:hidden flex justify-between items-center h-16 px-gutter w-full bg-surface border-b border-outline-variant z-50 sticky top-0">
        <h1 className="font-headline-sm text-headline-sm font-black text-on-surface">SlideInto</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => navigate('/generator')}
            className="text-xs px-2.5 py-1 rounded text-on-surface-variant"
          >
            Generator
          </button>
          <button 
            onClick={() => navigate('/settings')}
            className="text-xs px-2.5 py-1 rounded text-on-surface-variant"
          >
            Settings
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow md:ml-[240px] pt-20 md:pt-0 max-w-container-max mx-auto px-margin-mobile md:px-gutter py-8 md:py-16">
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center gap-12 mb-24">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full font-label-caps text-label-caps">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>extension</span>
              LOCAL INSTALLATION ACTIVE
            </div>
            <h2 className="font-display-lg text-display-lg text-on-surface">
              Personalize DMs without leaving LinkedIn
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto lg:mx-0 font-light">
              We have generated your functional Chrome Extension code locally inside the project! Follow these simple steps to load it into Chrome:
            </p>
            
            <div className="bg-surface-container-low border border-outline-variant p-5 rounded-xl text-left space-y-4 font-body-sm text-sm">
              <div className="flex items-start gap-3">
                <span className="bg-primary/20 text-primary font-bold text-xs px-2 py-0.5 rounded-full shrink-0">1</span>
                <div>Open Google Chrome and navigate to <code className="bg-surface px-1.5 py-0.5 rounded text-primary">chrome://extensions/</code></div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-primary/20 text-primary font-bold text-xs px-2 py-0.5 rounded-full shrink-0">2</span>
                <div>Turn on <strong>Developer Mode</strong> using the toggle switch in the top right.</div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-primary/20 text-primary font-bold text-xs px-2 py-0.5 rounded-full shrink-0">3</span>
                <div>Click the <strong>Load unpacked</strong> button in the top left.</div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-primary/20 text-primary font-bold text-xs px-2 py-0.5 rounded-full shrink-0">4</span>
                <div>Select the <code className="bg-surface px-1.5 py-0.5 rounded text-primary">chrome-extension</code> folder inside your project directory (<code className="bg-surface px-1.5 py-0.5 rounded text-primary">d:/ColdDm/chrome-extension</code>).</div>
              </div>
            </div>

            <p className="font-body-sm text-xs text-on-surface-variant italic mt-3">
              Once loaded, open any LinkedIn, X, or GitHub profile, open SlideInto Extension popup to log in, and begin inserting personalized drafts directly into messaging composers!
            </p>
          </div>

          <div className="flex-1 w-full relative">
            {/* Decorative background blob */}
            <div className="absolute inset-0 bg-secondary-fixed-dim opacity-10 blur-3xl rounded-full"></div>
            
            <div className="relative glass-card rounded-xl shadow-lg border border-surface-variant overflow-hidden" style={{ paddingTop: '60%' }}>
              {/* Simulated Browser/LinkedIn UI */}
              <div className="absolute inset-0 flex flex-col bg-surface-container-lowest">
                {/* Browser Header */}
                <div className="h-8 bg-surface-container-low border-b border-surface-variant flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-error-container"></div>
                    <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
                    <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
                  </div>
                  <div className="flex-1 mx-4 h-5 bg-surface-bright rounded-md text-center text-[10px] text-outline flex items-center justify-center">
                    linkedin.com/in/sarah-connor
                  </div>
                </div>

                {/* LinkedIn Mock Profile */}
                <div className="flex-1 p-6 relative">
                  <div className="flex items-start gap-4 border-b border-surface-variant pb-6 mb-6">
                    <div className="w-20 h-20 rounded-full bg-surface-container-highest"></div>
                    <div className="space-y-2 flex-1">
                      <div className="w-1/2 h-5 bg-surface-container-highest rounded"></div>
                      <div className="w-3/4 h-3.5 bg-surface-container-low rounded"></div>
                      <div className="w-1/4 h-3.5 bg-surface-container-low rounded"></div>
                    </div>
                  </div>

                  {/* SlideInto Extension UI Overlay */}
                  <div className="absolute bottom-6 right-6 w-80 bg-surface-container-lowest rounded-xl shadow-[0px_8px_24px_rgba(0,0,0,0.12)] border border-primary-fixed flex flex-col overflow-hidden animate-[slideUp_0.5s_ease-out]">
                    <div className="bg-primary px-4 py-3 flex justify-between items-center">
                      <div className="flex items-center gap-2 text-on-primary">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>bolt</span>
                        <span className="font-mono-label text-mono-label">SlideInto Analysis</span>
                      </div>
                      <span className="material-symbols-outlined text-on-primary opacity-80" style={{ fontSize: '16px' }}>close</span>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded text-[10px] font-bold">Tech Leader</span>
                        <span className="px-2 py-1 bg-secondary-fixed text-on-secondary-fixed rounded text-[10px] font-bold">Hiring</span>
                      </div>
                      <div className="space-y-2">
                        <div className="p-3 bg-surface-bright border border-surface-variant rounded-lg text-xs text-on-surface leading-normal">
                          "Hi Sarah, noticed your team is expanding. Based on your recent post about scaling AI infrastructure, I'd love to share how we helped Acme Corp solve..."
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button className="px-3 py-1.5 text-xs font-semibold text-primary">Regenerate</button>
                        <button className="px-3 py-1.5 bg-primary text-on-primary text-xs font-semibold rounded">Insert to Chat</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="space-y-8">
          <div className="text-center mb-12">
            <h3 className="font-headline-lg text-headline-lg text-on-surface">Supercharge your outreach</h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Everything you need, right where you need it.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-surface-variant shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined" style={{ fontSize: '80px' }}>psychology</span>
              </div>
              <div className="w-12 h-12 bg-secondary-fixed rounded-full flex items-center justify-center mb-6 text-on-secondary-fixed">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <h4 className="font-title-md text-title-md text-on-surface mb-3">1-click analysis</h4>
              <p className="font-body-md text-body-md text-on-surface-variant font-light">Instantly scan a prospect's entire profile, recent posts, and company news to find the perfect hook.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-surface-variant shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined" style={{ fontSize: '80px' }}>edit_document</span>
              </div>
              <div className="w-12 h-12 bg-tertiary-fixed rounded-full flex items-center justify-center mb-6 text-on-tertiary-fixed">
                <span className="material-symbols-outlined">edit_document</span>
              </div>
              <h4 className="font-title-md text-title-md text-on-surface mb-3">Inline drafting</h4>
              <p className="font-body-md text-body-md text-on-surface-variant font-light">Generate hyper-personalized messages directly in the LinkedIn message box. No copy-pasting required.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-surface-variant shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined" style={{ fontSize: '80px' }}>sync</span>
              </div>
              <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center mb-6 text-on-primary-fixed">
                <span className="material-symbols-outlined">sync</span>
              </div>
              <h4 className="font-title-md text-title-md text-on-surface mb-3">History sync</h4>
              <p className="font-body-md text-body-md text-on-surface-variant font-light">Every message generated is automatically synced to your dashboard for tracking, A/B testing, and CRM integration.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
