import React, { useState } from 'react';

export default function Settings({ activeTab, setActiveTab }) {
  const [activeSubTab, setActiveSubTab] = useState('profile'); // profile, integration, billing, api
  const [fullName, setFullName] = useState('Sarah Jenkins');
  const [bioContext, setBioContext] = useState(
    `I'm Sarah, a VP of Sales at a mid-sized tech logistics firm. I've been in the industry for 15 years, mostly focusing on supply chain optimization. \n\nMy outreach style should be direct, highly professional, and strictly value-oriented. Avoid slang or overly enthusiastic punctuation. I always want to highlight how our solutions reduce operational overhead within the first quarter.`
  );
  
  // Integration settings
  const [linkedInConnected, setLinkedInConnected] = useState(true);
  const [twitterConnected, setTwitterConnected] = useState(false);
  const [apiKey, setApiKey] = useState('sk_live_••••••••••••••••••••3a9b');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSaveProfile = () => {
    showToast('Profile settings saved successfully!');
  };

  const handleDiscardChanges = () => {
    setFullName('Sarah Jenkins');
    setBioContext(
      `I'm Sarah, a VP of Sales at a mid-sized tech logistics firm. I've been in the industry for 15 years, mostly focusing on supply chain optimization. \n\nMy outreach style should be direct, highly professional, and strictly value-oriented. Avoid slang or overly enthusiastic punctuation. I always want to highlight how our solutions reduce operational overhead within the first quarter.`
    );
    showToast('Changes discarded.');
  };

  return (
    <div className="bg-surface text-on-surface h-screen flex overflow-hidden selection:bg-primary-container selection:text-on-primary-container w-full font-sans">
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Utility for hiding scrollbar but keeping functionality */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        
        /* Simple entry animation */
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fadeInUp 0.4s ease-out forwards;
        }
        `
      }} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center bg-surface-container-highest border border-outline px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md transition-all">
          <div className="h-2 w-2 rounded-full bg-primary mr-3 animate-ping" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Desktop SideNavBar */}
      <nav className="hidden md:flex flex-col py-6 px-4 bg-surface-container-lowest text-primary font-body-sm text-body-sm w-[240px] h-screen fixed left-0 top-0 border-r border-outline-variant z-40">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold overflow-hidden shrink-0">
            <img 
              alt="User Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC16shrfiCTD9Zf_D6p9sqjyaiDti6TtjuS13h-FY6-R4Nv8vjBLQ0HdVF_I2hndalo_qVJMlaaX-j1D5E6ZmJXkoW2U214SLuc3iMAE6cqFjUzEEKiFHvo1StvyU1-eN6HaavZ7xiGvGSJl2Bv3Wh509aL0v1O5YRARyoPkYrllJqfuArkBg-E7bJtB9WfjZJ3vBfSjmLOcQG4K9GSw_tbyf4cAWStX9wr_pM82dd-85UFYLKEkTRArwbd97fVo5WyQe6JG3RkDM4r"
            />
          </div>
          <div>
            <div className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">SlideInto</div>
            <div className="text-on-surface-variant text-[11px] font-medium leading-none mt-1 uppercase tracking-wider">Ghostwriter AI</div>
          </div>
        </div>
        
        {/* Main Navigation */}
        <div className="flex-1 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 group text-left ${
              activeTab === 'dashboard' ? 'bg-secondary-container text-on-secondary-container font-semibold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">dashboard</span>
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('generator')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 group text-left ${
              activeTab === 'generator' ? 'bg-secondary-container text-on-secondary-container font-semibold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">bolt</span>
            Generate DM
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 group text-left ${
              activeTab === 'history' ? 'bg-secondary-container text-on-secondary-container font-semibold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">history</span>
            History
          </button>
          <button 
            onClick={() => setActiveTab('bulk')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 group text-left ${
              activeTab === 'bulk' ? 'bg-secondary-container text-on-secondary-container font-semibold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">rocket_launch</span>
            Bulk Mode
          </button>
          <button 
            onClick={() => setActiveTab('extension')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 group text-left ${
              activeTab === 'extension' ? 'bg-secondary-container text-on-secondary-container font-semibold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">extension</span>
            Chrome Extension
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg active:scale-95 duration-200 text-left ${
              activeTab === 'settings' ? 'bg-secondary-container text-on-secondary-container font-semibold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
            Settings
          </button>
        </div>
        
        {/* CTA & Footer */}
        <div className="mt-auto space-y-4 pt-4 border-t border-outline-variant">
          <button className="w-full py-2 px-4 bg-gradient-to-r from-primary to-surface-tint text-on-primary rounded-lg font-medium shadow-sm hover:opacity-90 transition-opacity active:scale-95 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
            Upgrade to Pro
          </button>
          <div className="space-y-1">
            <button 
              onClick={() => setActiveTab('help')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 text-left ${
                activeTab === 'help' ? 'bg-secondary-container text-on-secondary-container font-semibold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">help</span>
              Help Center
            </button>
            <button 
              onClick={() => setActiveTab('landing')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors active:scale-95 duration-200 text-left"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              Log Out
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile TopAppBar */}
      <header className="md:hidden fixed top-0 w-full z-50 flex justify-between items-center h-16 px-gutter max-w-container-max mx-auto bg-surface text-primary font-body-sm text-body-sm border-b border-outline-variant">
        <button 
          onClick={() => setActiveTab('landing')}
          className="font-headline-sm text-headline-sm font-black text-on-surface tracking-tight"
        >
          SlideInto
        </button>
        <div className="flex gap-2">
          {['generator', 'settings'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs px-2.5 py-1 rounded ${activeTab === tab ? 'bg-secondary-container text-on-secondary-container font-semibold' : 'text-on-surface-variant'}`}
            >
              {tab === 'generator' ? 'Generator' : 'Settings'}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto relative pt-20 md:pt-0 md:ml-[240px] bg-surface pb-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12">
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">Account Settings</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Manage your profile, billing, and system integrations.</p>
          </div>
          
          {/* Settings Navigation Tabs */}
          <div className="flex items-center gap-8 border-b border-outline-variant mb-8 overflow-x-auto no-scrollbar">
            <button 
              onClick={() => setActiveSubTab('profile')}
              className={`font-title-md text-title-md pb-3 whitespace-nowrap px-1 transition-all border-b-2 ${
                activeSubTab === 'profile' ? 'text-primary border-primary font-bold' : 'text-on-surface-variant hover:text-on-surface border-transparent'
              }`}
            >
              Profile
            </button>
            <button 
              onClick={() => setActiveSubTab('integration')}
              className={`font-title-md text-title-md pb-3 whitespace-nowrap px-1 transition-all border-b-2 ${
                activeSubTab === 'integration' ? 'text-primary border-primary font-bold' : 'text-on-surface-variant hover:text-on-surface border-transparent'
              }`}
            >
              Integration
            </button>
            <button 
              onClick={() => setActiveSubTab('billing')}
              className={`font-title-md text-title-md pb-3 whitespace-nowrap px-1 transition-all border-b-2 ${
                activeSubTab === 'billing' ? 'text-primary border-primary font-bold' : 'text-on-surface-variant hover:text-on-surface border-transparent'
              }`}
            >
              Billing
            </button>
            <button 
              onClick={() => setActiveSubTab('api')}
              className={`font-title-md text-title-md pb-3 whitespace-nowrap px-1 transition-all border-b-2 ${
                activeSubTab === 'api' ? 'text-primary border-primary font-bold' : 'text-on-surface-variant hover:text-on-surface border-transparent'
              }`}
            >
              API
            </button>
          </div>
          
          {/* Active Tab Content */}
          <div className="max-w-3xl space-y-8 animate-fade-in-up">
            
            {activeSubTab === 'profile' && (
              <>
                {/* Personal Information Card */}
                <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-outline-variant/50 bg-surface-bright/50">
                    <h2 className="font-title-md text-title-md text-on-surface">Personal Information</h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Update your basic profile details.</p>
                  </div>
                  <div className="p-6 space-y-6">
                    
                    {/* Avatar row */}
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-full border border-outline-variant bg-surface-container-low flex items-center justify-center overflow-hidden shrink-0 relative group cursor-pointer">
                        <img 
                          alt="Current Avatar" 
                          className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZHCLfQuzOVnGhj5EDdoIr3atFo_itRw1KB8vjO1HVBsBb2raYyGUCU39_9ZIXZb09YSBWG_1M3N1ffOYzAfb5mhWZCQm3_dPsa2wBrkoNKEn2PRdSaENiCMlmwLFh0utKKI9u21HdkQCsixbf3PnpTq4h-6UiWhD4BQHgC_rGsQssC8FEThLOsdr_fPlnuTh-GBkqSO4wXx92sj3cMyvIXsjmYYcWPh7b7SLubQa6mpjAFiTKrnqiUyTHlNTnbQUoGHtDLqzxMWyL"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="material-symbols-outlined text-on-surface">photo_camera</span>
                        </div>
                      </div>
                      <div>
                        <button className="px-4 py-2 bg-surface-container-lowest border border-outline-variant text-on-surface rounded-lg font-mono-label text-mono-label hover:bg-surface-container-low transition-colors active:scale-95">Change Avatar</button>
                        <p className="text-[12px] text-on-surface-variant mt-2">JPG, GIF or PNG. Max size of 2MB.</p>
                      </div>
                    </div>
                    
                    {/* Grid form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block">Full Name</label>
                        <input 
                          className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary-container focus:border-primary transition-shadow" 
                          type="text" 
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block">Email Address</label>
                        <input className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface-variant cursor-not-allowed focus:outline-none" disabled type="email" defaultValue="sarah.j@example.com" />
                        <p className="text-[11px] text-on-surface-variant">Contact support to change your email.</p>
                      </div>
                    </div>
                  </div>
                </section>
                
                {/* AI Context Card */}
                <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden relative">
                  {/* Decorative subtle gradient */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary-container to-surface-container-lowest"></div>
                  <div className="px-6 py-5 border-b border-outline-variant/50 flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
                    <div>
                      <h2 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
                        Your Bio &amp; Context
                      </h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">This is the critical knowledge base the AI uses to impersonate your tone, highlight your achievements, and personalize outreach.</p>
                    </div>
                    <span className="px-2.5 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full font-mono-label text-[11px] tracking-wide shrink-0">High Importance</span>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Context Window</label>
                        <span className="font-mono-label text-[11px] text-on-surface-variant">{bioContext.length} / 2000 chars</span>
                      </div>
                      <textarea 
                        className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary-container focus:border-primary transition-shadow resize-y" 
                        placeholder="E.g., I am a Senior Product Marketer specializing in B2B SaaS. My tone is professional but conversational, never overly formal. I like to focus on ROI and time-to-value in my outreach..." 
                        rows="8"
                        value={bioContext}
                        onChange={(e) => setBioContext(e.target.value)}
                      />
                    </div>
                    
                    {/* Pro Tip */}
                    <div className="mt-6 p-4 rounded-lg bg-surface-bright border border-surface-variant flex gap-3">
                      <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">lightbulb</span>
                      <div>
                        <p className="font-mono-label text-mono-label text-on-surface font-semibold mb-1">Contextual Priming</p>
                        <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">The more specific you are about your target audience and your unique value proposition, the better the AI can craft hyper-personalized openers.</p>
                      </div>
                    </div>
                  </div>
                </section>
                
                {/* Actions */}
                <div className="flex justify-end gap-4 pt-4 border-t border-outline-variant/50">
                  <button 
                    onClick={handleDiscardChanges}
                    className="px-6 py-2.5 bg-surface-container-lowest border border-outline-variant text-on-surface rounded-lg font-body-sm font-medium hover:bg-surface-container-low transition-colors active:scale-95"
                  >
                    Discard Changes
                  </button>
                  <button 
                    onClick={handleSaveProfile}
                    className="px-6 py-2.5 bg-primary-container text-on-primary-container rounded-lg font-body-sm font-medium hover:opacity-90 transition-opacity active:scale-95 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">save</span>
                    Save Profile
                  </button>
                </div>
              </>
            )}

            {activeSubTab === 'integration' && (
              <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-outline-variant/50 bg-surface-bright/50">
                  <h2 className="font-title-md text-title-md text-on-surface">System Integrations</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Connect SlideInto to your favorite platforms for seamless sync.</p>
                </div>
                <div className="p-6 space-y-6">
                  
                  <div className="flex justify-between items-center py-2 border-b border-outline-variant/30">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#0a66c2] text-[32px]">badge</span>
                      <div>
                        <div className="font-semibold text-sm text-on-surface">LinkedIn Sync</div>
                        <div className="text-xs text-on-surface-variant">Auto-inject generated DMs into LinkedIn web client.</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setLinkedInConnected(!linkedInConnected);
                        showToast(linkedInConnected ? 'LinkedIn disconnected' : 'LinkedIn connected successfully!');
                      }}
                      className={`text-xs px-3 py-1.5 rounded font-bold transition-all ${
                        linkedInConnected ? 'bg-[#10b981]/15 text-[#10b981]' : 'bg-primary-container text-on-primary-container'
                      }`}
                    >
                      {linkedInConnected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-on-surface text-[32px]">alternate_email</span>
                      <div>
                        <div className="font-semibold text-sm text-on-surface">Twitter / X Sync</div>
                        <div className="text-xs text-on-surface-variant">Auto-inject generated DMs into X direct messages.</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setTwitterConnected(!twitterConnected);
                        showToast(twitterConnected ? 'Twitter disconnected' : 'Twitter connected successfully!');
                      }}
                      className={`text-xs px-3 py-1.5 rounded font-bold transition-all ${
                        twitterConnected ? 'bg-[#10b981]/15 text-[#10b981]' : 'bg-primary-container text-on-primary-container'
                      }`}
                    >
                      {twitterConnected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                  
                </div>
              </section>
            )}

            {activeSubTab === 'billing' && (
              <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-outline-variant/50 bg-surface-bright/50">
                  <h2 className="font-title-md text-title-md text-on-surface">Subscription & Billing</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Review your current plan details and billing schedule.</p>
                </div>
                <div className="p-6 space-y-6">
                  
                  {/* Active Plan Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 border border-outline-variant rounded-xl p-5 bg-surface-bright">
                      <span className="bg-primary/10 text-primary font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-primary/20 uppercase tracking-wider">Active Plan</span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface mt-2 font-bold">Standard Pro</h3>
                      <p className="text-xs text-on-surface-variant mt-1">Next renewal date: July 12, 2026 ($29/month)</p>
                      
                      {/* Credit bar */}
                      <div className="mt-5 space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-on-surface-variant">AI Word Credits</span>
                          <span className="text-on-surface">42,500 / 100,000 remaining</span>
                        </div>
                        <div className="w-full bg-surface-container rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '42.5%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-outline-variant rounded-xl p-5 bg-surface-container-low flex flex-col justify-between items-center text-center">
                      <div>
                        <div className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">Bulk Multiplier</div>
                        <div className="text-3xl font-extrabold text-primary mt-2">1.5x</div>
                        <p className="text-[10px] text-on-surface-variant mt-1">Processing cost efficiency rating</p>
                      </div>
                      <button 
                        onClick={() => showToast('Upgraded feature initialized!')}
                        className="w-full mt-4 py-2 bg-gradient-to-r from-primary to-surface-tint text-on-primary font-bold text-xs rounded-lg shadow-sm hover:opacity-90 transition-opacity"
                      >
                        Upgrade to Unlimited
                      </button>
                    </div>
                  </div>
                  
                </div>
              </section>
            )}

            {activeSubTab === 'api' && (
              <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-outline-variant/50 bg-surface-bright/50">
                  <h2 className="font-title-md text-title-md text-on-surface">API Credentials</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Configure your own OpenAI / Anthropic keys for unrestricted generation.</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block">API Key (OpenAI / Claude)</label>
                    <input 
                      className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-mono text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary-container focus:border-primary transition-shadow" 
                      type="password" 
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <p className="text-xs text-on-surface-variant">Your API key is stored locally in your browser workspace and never sent to our servers.</p>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button 
                      onClick={() => showToast('API Keys updated successfully!')}
                      className="px-6 py-2 bg-primary text-on-primary hover:bg-surface-tint font-bold text-xs rounded-lg shadow-sm transition-colors"
                    >
                      Save API Credentials
                    </button>
                  </div>
                </div>
              </section>
            )}
            
          </div>
        </div>
      </main>
    </div>
  );
}
