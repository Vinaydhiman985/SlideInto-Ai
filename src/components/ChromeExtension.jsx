import React from 'react';

export default function ChromeExtension({ activeTab, setActiveTab }) {
  return (
    <div className="bg-background text-on-background antialiased md:pl-[240px] min-h-screen">
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

      {/* SideNavBar (Desktop Only) */}
      <nav className="hidden md:flex w-[240px] h-screen fixed left-0 top-0 bg-surface-container-lowest border-r border-outline-variant flex-col py-margin-desktop px-sm z-40">
        <div className="mb-8 px-4">
          <h1 className="font-headline-sm text-headline-sm font-bold text-primary">SlideInto</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Ghostwriter AI</p>
        </div>
        <div className="flex-1 flex flex-col gap-2 px-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-3 px-3 py-2 transition-colors active:scale-95 duration-200 rounded-lg text-left ${
              activeTab === 'dashboard' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-body-md text-body-md">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-3 px-3 py-2 transition-colors active:scale-95 duration-200 rounded-lg text-left ${
              activeTab === 'generator' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined">bolt</span>
            <span className="font-body-md text-body-md">Generate DM</span>
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-3 px-3 py-2 transition-colors active:scale-95 duration-200 rounded-lg text-left ${
              activeTab === 'history' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined">history</span>
            <span className="font-body-md text-body-md">History</span>
          </button>
          <button 
            onClick={() => setActiveTab('bulk')}
            className={`flex items-center gap-3 px-3 py-2 transition-colors active:scale-95 duration-200 rounded-lg text-left ${
              activeTab === 'bulk' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined">rocket_launch</span>
            <span className="font-body-md text-body-md">Bulk Mode</span>
          </button>
          <button 
            onClick={() => setActiveTab('extension')}
            className={`flex items-center gap-3 px-3 py-2 transition-colors active:scale-95 duration-200 rounded-lg text-left ${
              activeTab === 'extension' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined">extension</span>
            <span className="font-body-md text-body-md">Chrome Extension</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-3 py-2 transition-colors active:scale-95 duration-200 rounded-lg text-left ${
              activeTab === 'settings' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-body-md text-body-md">Settings</span>
          </button>
        </div>
        <div className="mt-auto flex flex-col gap-2 px-2">
          <button className="w-full bg-primary-container text-on-primary font-body-sm text-body-sm py-2 rounded-lg hover:opacity-90 transition-opacity">
            Upgrade to Pro
          </button>
          <div className="mt-4 pt-4 border-t border-outline-variant flex flex-col gap-2">
            <a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors active:scale-95 duration-200 rounded-lg" href="#">
              <span className="material-symbols-outlined">help</span>
              <span className="font-body-md text-body-md">Help Center</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors active:scale-95 duration-200 rounded-lg" href="#">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-body-md text-body-md">Log Out</span>
            </a>
          </div>
        </div>
      </nav>

      {/* TopAppBar (Mobile Only) */}
      <header className="md:hidden flex justify-between items-center h-16 px-gutter w-full bg-surface border-b border-outline-variant z-50 sticky top-0">
        <h1 className="font-headline-sm text-headline-sm font-black text-on-surface">SlideInto</h1>
        <div className="flex gap-2">
          {['generator', 'extension'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs px-2.5 py-1 rounded ${activeTab === tab ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant'}`}
            >
              {tab === 'generator' ? 'Generator' : 'Extension'}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-8 md:py-16">
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center gap-12 mb-24">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full font-label-caps text-label-caps">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>extension</span>
              CHROME EXTENSION
            </div>
            <h2 className="font-display-lg text-display-lg text-on-surface">
              Personalize DMs without leaving LinkedIn
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto lg:mx-0 font-light">
              Instantly analyze profiles and draft hyper-personalized messages directly within your LinkedIn workflow. Stop context switching and start connecting.
            </p>
            <div className="pt-4">
              <button className="bg-primary text-on-primary px-8 py-4 rounded-lg font-title-md text-title-md hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-2 w-full lg:w-auto mx-auto lg:mx-0 cursor-pointer active:scale-95 duration-150">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.836 7.643l-6.31 9.932c-.156.248-.426.398-.718.398-.018 0-.036 0-.055-.002-.313-.02-.573-.223-.675-.515L8.52 12.98l-3.83-1.074c-.3-.083-.51-.336-.532-.647-.02-.31.155-.595.443-.726l11.66-5.26c.264-.12.576-.048.76.175.185.223.218.535.08.795z" />
                </svg>
                Add to Chrome (Free)
              </button>
              <p className="mt-3 font-body-sm text-body-sm text-on-surface-variant">Over 10,000 professionals use SlideInto</p>
            </div>
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
