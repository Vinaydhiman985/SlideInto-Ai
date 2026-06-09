import React, { useState } from 'react';

export default function GenerateDM({ activeTab, setActiveTab }) {
  const [profileUrl, setProfileUrl] = useState('');
  const [outreachGoal, setOutreachGoal] = useState('job');
  const [contextBio, setContextBio] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      let draft = '';
      const username = profileUrl ? profileUrl.split('/in/')[1]?.split('/')[0] || 'there' : 'there';
      const capitalizedUser = username.charAt(0).toUpperCase() + username.slice(1);

      if (outreachGoal === 'job') {
        draft = `Hi ${capitalizedUser},\n\nI’ve been following your work at your company and was really impressed by the recent projects your team has shipped. I’m an engineer looking for new opportunities and would love to connect to learn more about the team culture and any potential openings you might have. \n\nI've attached some context on my background${contextBio ? ` (${contextBio})` : ''} below. Let me know if you have 5 minutes for a quick chat!\n\nBest,\nJohn`;
      } else if (outreachGoal === 'collab') {
        draft = `Hey ${capitalizedUser},\n\nI love what you're building. I’m currently working on SlideInto, an AI copywriter for cold outreach, and I see some really interesting overlap with what you're doing${contextBio ? ` (${contextBio})` : ''}.\n\nWould you be open to a quick collaboration brainstorm? I can share a couple of co-marketing ideas I drafted for your team. Let me know if I can drop a quick Loom video here!\n\nBest,\nJohn`;
      } else if (outreachGoal === 'advice') {
        draft = `Hi ${capitalizedUser},\n\nI hope you're having a great week. I noticed your background in engineering leadership and had a quick question: how do you balance scale and velocity in early-stage engineering hires?\n\nI'm navigating this exact challenge right now${contextBio ? ` (specifically: ${contextBio})` : ''}. I'd highly value 10 minutes of your advice. Virtual coffee is on me! \n\nThanks,\nJohn`;
      } else {
        draft = `Hello ${capitalizedUser},\n\nI saw that your team is currently expanding its outbound sales efforts. We recently helped a similar SaaS team double their response rates on LinkedIn using automated personalized DMs${contextBio ? ` (${contextBio})` : ''}.\n\nWould you be open to looking at a 45-second demo of how this works? No sales pitch, just sharing what's working for others in the space.\n\nBest,\nJohn`;
      }

      setGeneratedText(draft);
      setIsGenerating(false);
    }, 1200);
  };

  const handleCopy = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const additionalVariations = [
        `Hey! I noticed you are in the same space and thought it would be great to connect. I'm building outreach tools. Let's chat!`,
        `Hi! Loved your recent insights. Would love to connect and exchange ideas sometime.`
      ];
      setGeneratedText(additionalVariations[Math.floor(Math.random() * additionalVariations.length)]);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="bg-background text-on-surface antialiased font-sans flex min-h-screen selection:bg-secondary-container selection:text-on-secondary-container">
      <style dangerouslySetInnerHTML={{__html: `
        /* Custom scrollbar for a cleaner look */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: #d8dadc;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #c3c6d7;
        }
        
        /* Subtle dot grid pattern for empty states */
        .dot-grid-bg {
            background-image: radial-gradient(#e0e3e5 1px, transparent 1px);
            background-size: 20px 20px;
        }
      `}} />

      {/* Shared Component: SideNavBar */}
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
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 font-body-sm text-body-sm text-left ${
              activeTab === 'dashboard' ? 'bg-secondary-container text-on-secondary-container font-medium' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            Dashboard
          </button>
          
          <button 
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 font-body-sm text-body-sm text-left ${
              activeTab === 'generator' ? 'bg-secondary-container text-on-secondary-container font-medium' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            Generate DM
          </button>
          
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 font-body-sm text-body-sm text-left ${
              activeTab === 'history' ? 'bg-secondary-container text-on-secondary-container font-medium' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">history</span>
            History
          </button>
          
          <button 
            onClick={() => setActiveTab('bulk')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 font-body-sm text-body-sm text-left ${
              activeTab === 'bulk' ? 'bg-secondary-container text-on-secondary-container font-medium' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
            Bulk Mode
          </button>
          
          <button 
            onClick={() => setActiveTab('extension')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 font-body-sm text-body-sm text-left ${
              activeTab === 'extension' ? 'bg-secondary-container text-on-secondary-container font-medium' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">extension</span>
            Chrome Extension
          </button>
          
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors active:scale-95 duration-200 font-body-sm text-body-sm text-left mt-auto ${
              activeTab === 'settings' ? 'bg-secondary-container text-on-secondary-container font-medium' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            Settings
          </button>
        </div>
        
        {/* Footer Actions */}
        <div className="mt-4 pt-4 border-t border-outline-variant flex flex-col gap-1">
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors active:scale-95 duration-200 font-body-sm text-body-sm" href="#">
            <span className="material-symbols-outlined text-[20px]">help</span>
            Help Center
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors active:scale-95 duration-200 font-body-sm text-body-sm" href="#">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Log Out
          </a>
        </div>
        
        {/* CTA */}
        <div className="mt-6 px-2">
          <button className="w-full bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors py-2 px-4 rounded-xl border border-outline-variant font-body-sm text-body-sm font-medium flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[16px]">stars</span>
            Upgrade to Pro
          </button>
        </div>
      </nav>

      {/* Main Canvas */}
      <main className="flex-1 ml-0 md:ml-[240px] px-gutter py-margin-desktop md:py-[48px] max-w-container-max mx-auto w-full">
        {/* Page Header */}
        <header className="mb-10">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Craft Single Message</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl">
            Configure your outreach parameters below. Our AI will analyze the target profile and generate a highly personalized, high-converting direct message.
          </p>
        </header>

        {/* Two Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Panel: Input Form */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.02)] p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-surface-variant">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">person_search</span>
              </div>
              <h3 className="font-title-md text-title-md text-on-surface">Target Details</h3>
            </div>
            
            <form className="flex flex-col gap-6" onSubmit={handleGenerate}>
              {/* URL Input */}
              <div className="flex flex-col gap-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant tracking-wider" htmlFor="profile-url">Target Profile URL</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline text-[20px]">link</span>
                  </div>
                  <input 
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface focus:ring-2 focus:ring-secondary-container focus:border-secondary-container transition-shadow placeholder:text-outline/60 outline-none" 
                    id="profile-url" 
                    placeholder="https://linkedin.com/in/username" 
                    type="url" 
                    value={profileUrl}
                    onChange={(e) => setProfileUrl(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              {/* Goal Dropdown */}
              <div className="flex flex-col gap-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant tracking-wider" htmlFor="campaign-goal">Outreach Goal</label>
                <div className="relative">
                  <select 
                    className="w-full pl-4 pr-10 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface focus:ring-2 focus:ring-secondary-container focus:border-secondary-container appearance-none transition-shadow cursor-pointer outline-none" 
                    id="campaign-goal"
                    value={outreachGoal}
                    onChange={(e) => setOutreachGoal(e.target.value)}
                  >
                    <option value="job">Job Inquiry</option>
                    <option value="collab">Collaboration Proposal</option>
                    <option value="advice">Seeking Advice / Mentorship</option>
                    <option value="sales">Sales Pitch / Demo Request</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-outline">
                    <span className="material-symbols-outlined text-[20px]">expand_more</span>
                  </div>
                </div>
              </div>
              
              {/* Context Textarea */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="font-label-caps text-label-caps text-on-surface-variant tracking-wider" htmlFor="context-bio">Additional Context / Bio</label>
                  <span className="font-mono-label text-mono-label text-outline">Optional</span>
                </div>
                <textarea 
                  className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface focus:ring-2 focus:ring-secondary-container focus:border-secondary-container transition-shadow resize-y placeholder:text-outline/60 outline-none" 
                  id="context-bio" 
                  placeholder="Mention a mutual connection, a recent post they made, or a specific value proposition you offer..." 
                  rows="4"
                  value={contextBio}
                  onChange={(e) => setContextBio(e.target.value)}
                />
              </div>

              <button 
                type="submit"
                disabled={isGenerating}
                className="hidden" // Invoked by the primary card button or return key
              />
            </form>
          </div>

          {/* Right Panel: Generated Output */}
          <div className="lg:col-span-7 bg-surface-bright rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.02)] flex flex-col h-full min-h-[500px] overflow-hidden relative">
            {/* Panel Header */}
            <div className="px-6 py-4 border-b border-surface-variant bg-surface-container-lowest flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[20px]">edit_document</span>
                <h3 className="font-title-md text-title-md text-on-surface">Generated Result</h3>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handleCopy}
                  className="p-2 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors disabled:opacity-50" 
                  disabled={!generatedText || isGenerating} 
                  title="Copy to clipboard"
                >
                  <span className="material-symbols-outlined text-[20px]">{copied ? 'done' : 'content_copy'}</span>
                </button>
                <button 
                  onClick={handleRegenerate}
                  className="p-2 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors disabled:opacity-50" 
                  disabled={!generatedText || isGenerating} 
                  title="Regenerate"
                >
                  <span className="material-symbols-outlined text-[20px]">refresh</span>
                </button>
              </div>
            </div>
            
            {/* Content Area */}
            {isGenerating ? (
              <div className="flex-1 p-8 flex flex-col items-center justify-center text-center bg-surface-bright">
                <span className="material-symbols-outlined animate-spin text-[32px] text-primary mb-4">sync</span>
                <h4 className="font-title-md text-title-md text-on-surface mb-2">Analyzing Profile...</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
                  We are reading profile details and drafting your message structure.
                </p>
              </div>
            ) : generatedText ? (
              <div className="flex-1 p-6 flex flex-col bg-surface-bright justify-between">
                <div className="font-mono text-dm-preview text-on-surface leading-relaxed p-4 bg-surface-container border border-outline-variant rounded-lg select-all whitespace-pre-wrap">
                  {generatedText}
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button 
                    onClick={() => {
                      setGeneratedText('');
                      setProfileUrl('');
                      setContextBio('');
                    }}
                    className="px-4 py-2 border border-outline-variant rounded-lg text-xs font-semibold text-on-surface hover:bg-surface-container-high"
                  >
                    Clear
                  </button>
                  <button 
                    onClick={handleCopy}
                    className="px-5 py-2 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-surface-tint active:scale-95 duration-100"
                  >
                    {copied ? 'Copied!' : 'Copy Draft'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 p-8 flex flex-col items-center justify-center text-center dot-grid-bg relative">
                {/* Decorative background element */}
                <div className="absolute inset-0 bg-gradient-to-b from-surface-bright/50 to-surface-bright pointer-events-none"></div>
                <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-surface-container border border-outline-variant flex items-center justify-center mb-6 shadow-sm">
                    <span className="material-symbols-outlined text-[32px] text-tertiary">auto_awesome</span>
                  </div>
                  <h4 className="font-title-md text-title-md text-on-surface mb-2">Ready to Draft</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-8">
                    Fill in the target details on the left and hit generate. We'll analyze the profile and craft a compelling message tailored to your goal.
                  </p>
                  
                  {/* Main CTA */}
                  <button 
                    onClick={handleGenerate}
                    className="bg-primary hover:bg-surface-tint text-on-primary font-body-sm text-body-sm font-medium py-3 px-8 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">magic_button</span>
                    Generate Message
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
