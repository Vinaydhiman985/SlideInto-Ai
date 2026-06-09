import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function History() {
  const [historyItems, setHistoryItems] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [copiedText, setCopiedText] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null); // format: `${itemIndex}-${variantIndex}`
  const [toastMessage, setToastMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const activePath = location.pathname;

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoadingHistory(true);
        const response = await api.get('/api/dm/history');
        // response.data contains the list of saved generations
        setHistoryItems(response.data || []);
      } catch (err) {
        console.error('Failed to fetch history:', err);
        setError('Failed to retrieve history items.');
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchHistory();
  }, []);

  const handleCopy = (text, itemIdx, varIdx) => {
    if (text) {
      navigator.clipboard.writeText(text);
      const key = `${itemIdx}-${varIdx}`;
      setCopiedIndex(key);
      showToast('Copied to clipboard!');
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'linkedin':
        return 'badge';
      case 'twitter':
      case 'x':
        return 'alternate_email';
      case 'instagram':
        return 'photo_camera';
      case 'email':
        return 'mail';
      default:
        return 'link';
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
      `}} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center bg-surface-container-highest border border-outline px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md transition-all">
          <div className="h-2 w-2 rounded-full bg-primary mr-3 animate-ping" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

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

      {/* Main Canvas */}
      <main className="flex-1 ml-0 md:ml-[240px] px-gutter py-margin-desktop md:py-[48px] max-w-container-max mx-auto w-full">
        {/* Page Header */}
        <header className="mb-10">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Saved Collection</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl">
            Access your history of personalized outreach and high-converting message copies.
          </p>
        </header>

        {loadingHistory ? (
          <div className="flex flex-col items-center justify-center text-center py-24">
            <span className="material-symbols-outlined animate-spin text-[32px] text-primary mb-4">sync</span>
            <h4 className="font-title-md text-title-md text-on-surface mb-2">Retrieving saved drafts...</h4>
          </div>
        ) : error ? (
          <div className="p-4 bg-error-container text-on-error-container rounded-xl text-center max-w-lg mx-auto font-medium">
            {error}
          </div>
        ) : historyItems.length > 0 ? (
          <div className="space-y-8">
            {historyItems.map((item, itemIdx) => {
              const formattedDate = new Date(item.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div key={item._id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col gap-6">
                  {/* Header info */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant/40 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-[24px]">
                        {getPlatformIcon(item.platform)}
                      </span>
                      <div>
                        <a 
                          href={item.profileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="font-title-md text-sm font-semibold text-primary hover:underline break-all"
                        >
                          {item.profileUrl}
                        </a>
                        <div className="flex gap-2 items-center text-xs text-on-surface-variant mt-1">
                          <span className="font-medium capitalize bg-secondary-container/30 px-2 py-0.5 rounded text-on-secondary-container">
                            Goal: {item.outreachGoal}
                          </span>
                          <span>•</span>
                          <span>{formattedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Generated variations */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {item.generatedDMs && item.generatedDMs.map((variant, varIdx) => {
                      const copyKey = `${itemIdx}-${varIdx}`;
                      return (
                        <div 
                          key={variant._id || varIdx} 
                          className="border border-outline-variant bg-surface-bright hover:bg-surface-container-low rounded-xl p-4 flex flex-col justify-between transition-colors shadow-[0_2px_4px_rgba(0,0,0,0.01)]"
                        >
                          <div>
                            <div className="flex justify-between items-center mb-3">
                              <span className="font-mono-label text-[10px] text-on-surface-variant font-bold uppercase">Option {varIdx + 1}</span>
                              <span className="font-mono-label text-[10px] bg-secondary-container text-on-secondary-container font-semibold px-2 py-0.5 rounded-full border border-outline-variant">
                                Score: {variant.score}%
                              </span>
                            </div>
                            
                            <h5 className="font-bold text-xs text-on-surface mb-2">{variant.title}</h5>
                            
                            <div className="font-mono text-[11px] bg-surface-container-lowest border border-outline-variant/60 rounded-lg p-3 text-on-surface/90 leading-relaxed whitespace-pre-wrap select-all max-h-[180px] overflow-y-auto mb-4">
                              {variant.text}
                            </div>
                          </div>

                          <div>
                            <div className="grid grid-cols-3 gap-1 py-1.5 px-2 bg-surface-container rounded-md font-mono-label text-[9px] text-on-surface-variant border border-outline-variant/40 mb-3">
                              <div className="truncate">Hook: <span className="text-on-surface font-semibold">{variant.metrics?.hook}</span></div>
                              <div className="truncate">Len: <span className="text-on-surface font-semibold">{variant.metrics?.length}</span></div>
                              <div className="truncate">CTA: <span className="text-on-surface font-semibold">{variant.metrics?.cta}</span></div>
                            </div>

                            <button
                              onClick={() => handleCopy(variant.text, itemIdx, varIdx)}
                              className={`w-full flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-lg transition-all ${
                                copiedIndex === copyKey
                                  ? 'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30'
                                  : 'bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[14px]">
                                {copiedIndex === copyKey ? 'done' : 'content_copy'}
                              </span>
                              <span>{copiedIndex === copyKey ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="border-2 border-dashed border-outline-variant rounded-xl p-16 text-center">
            <span className="material-symbols-outlined text-[36px] text-on-surface-variant/40 mb-4">bookmark_border</span>
            <h3 className="font-title-md text-on-surface">No saved history</h3>
            <p className="text-xs text-on-surface-variant mt-1">Generate personalization drafts first. Your outreach records will automatically be saved here.</p>
            <button 
              onClick={() => navigate('/generator')}
              className="mt-6 bg-primary text-on-primary font-body-sm text-body-sm px-6 py-2 rounded-lg hover:opacity-90 transition-opacity cursor-pointer inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              Go to Generator
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
