import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function GenerateDM() {
  const [profileUrl, setProfileUrl] = useState('');
  const [outreachGoal, setOutreachGoal] = useState('job');
  const [contextBio, setContextBio] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDMs, setGeneratedDMs] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const activePath = location.pathname;

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError('');
    setIsGenerating(true);
    setGeneratedDMs([]);

    try {
      const response = await api.post('/api/dm/generate', {
        profileUrl,
        outreachGoal,
        contextBio
      });
      setGeneratedDMs(response.data.generatedDMs || response.data.generatedDMs || (response.data && response.data.data && response.data.data.generatedDMs) || []);
      showToast('AI templates generated successfully!');
    } catch (err) {
      setError(err.message || 'Generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text, index) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      showToast('Copied to clipboard!');
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <div className="bg-background text-on-surface antialiased font-sans flex min-h-screen selection:bg-secondary-container selection:text-on-secondary-container w-full">
      <style dangerouslySetInnerHTML={{__html: `
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
        
        .dot-grid-bg {
            background-image: radial-gradient(#e0e3e5 1px, transparent 1px);
            background-size: 20px 20px;
        }
      `}} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center bg-surface-container-highest border border-outline px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md transition-all">
          <div className="h-2 w-2 rounded-full bg-primary mr-3 animate-ping" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

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
            
            {error && (
              <div className="mb-4 p-3 bg-error-container text-on-error-container text-xs rounded-lg font-semibold">
                {error}
              </div>
            )}
            
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
                    placeholder="https://github.com/username or https://linkedin.com/in/username" 
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
                  placeholder="Mention a mutual connection, a recent post they made, or a specific value proposition..." 
                  rows="4"
                  value={contextBio}
                  onChange={(e) => setContextBio(e.target.value)}
                />
              </div>

              <button 
                type="submit"
                disabled={isGenerating}
                className="bg-primary hover:bg-surface-tint text-on-primary font-body-sm text-body-sm font-medium py-3 px-8 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                    <span>Analyzing & Drafting...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">magic_button</span>
                    <span>Generate Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Panel: Generated Outputs */}
          <div className="lg:col-span-7 bg-surface-bright rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.02)] flex flex-col h-full min-h-[500px] overflow-hidden relative p-6">
            <h3 className="font-title-md text-title-md text-on-surface mb-4 pb-2 border-b border-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">auto_awesome</span>
              AI Copy variations
            </h3>

            {isGenerating ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center py-12">
                <span className="material-symbols-outlined animate-spin text-[32px] text-primary mb-4">sync</span>
                <h4 className="font-title-md text-title-md text-on-surface mb-2">Analyzing Profile...</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
                  We are reading profile details and drafting your outreach variations. This may take 5-10 seconds.
                </p>
              </div>
            ) : generatedDMs.length > 0 ? (
              <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2">
                {generatedDMs.map((dm, idx) => (
                  <div key={idx} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-mono-label text-[10px] text-on-surface-variant font-semibold uppercase">Option {idx + 1}</span>
                        <h4 className="font-title-md text-sm font-semibold text-on-surface mt-0.5">{dm.title}</h4>
                      </div>
                      <div className="font-mono-label text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-secondary-container text-on-secondary-container border border-outline-variant">
                        Score: {dm.score}%
                      </div>
                    </div>

                    <div className="font-mono text-xs bg-surface-container border border-outline-variant rounded-lg p-4 text-on-surface/90 leading-relaxed whitespace-pre-wrap select-all">
                      {dm.text}
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-surface-container-low rounded-lg font-mono-label text-[11px] text-on-surface-variant border border-outline-variant">
                      <div>Hook: <span className="text-on-surface font-semibold">{dm.metrics.hook}</span></div>
                      <div>Length: <span className="text-on-surface font-semibold">{dm.metrics.length}</span></div>
                      <div>CTA: <span className="text-on-surface font-semibold">{dm.metrics.cta}</span></div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => handleCopy(dm.text, idx)}
                        className={`flex items-center gap-1.5 text-xs font-semibold py-2 px-4 rounded-lg transition-all ${
                          copiedIndex === idx
                            ? 'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30'
                            : 'bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {copiedIndex === idx ? 'done' : 'content_copy'}
                        </span>
                        <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-center dot-grid-bg relative py-16">
                <div className="absolute inset-0 bg-gradient-to-b from-surface-bright/50 to-surface-bright pointer-events-none"></div>
                <div className="relative z-10 max-w-sm mx-auto flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-surface-container border border-outline-variant flex items-center justify-center mb-6 shadow-sm">
                    <span className="material-symbols-outlined text-[32px] text-tertiary">draw</span>
                  </div>
                  <h4 className="font-title-md text-title-md text-on-surface mb-2">Ready to Draft</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                    Enter the URL of a target GitHub or LinkedIn profile on the left to write personalization copies using AI.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
