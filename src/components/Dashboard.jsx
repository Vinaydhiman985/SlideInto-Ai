import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const activePath = location.pathname;

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="bg-surface text-on-surface flex min-h-screen selection:bg-secondary-container selection:text-on-secondary-container w-full font-sans">
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

      {/* Mobile Header */}
      <header className="md:hidden flex justify-between items-center h-16 px-gutter fixed top-0 w-full z-50 bg-surface border-b border-outline-variant">
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

      {/* Main Content Canvas */}
      <main className="flex-1 md:ml-[240px] pt-20 md:pt-[48px] px-margin-mobile md:px-gutter max-w-container-max mx-auto pb-20 w-full">
        <div className="space-y-8 animate-fade-in">
          <div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
              Performance Analytics
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Welcome back, <span className="font-semibold text-primary">{user?.name || 'User'}</span>. Here are your real-time cold DM pipeline statistics.
            </p>
          </div>

          {/* Metrics cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total DMs Sent', value: '1,482', change: '+12.4%', up: true, icon: 'send' },
              { label: 'Response Rate', value: '41.2%', change: '+3.1%', up: true, icon: 'forum' },
              { label: 'Conversion Rate', value: '8.8%', change: '+1.2%', up: true, icon: 'handshake' },
              { label: 'Active Pipeline', value: '$12,400', change: '+24.1%', up: true, icon: 'monetization_on' }
            ].map((card, idx) => (
              <div key={idx} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">{card.label}</span>
                  <span className="material-symbols-outlined text-[20px] text-on-surface-variant">{card.icon}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface">{card.value}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    card.up ? 'bg-[#10b981]/15 text-[#10b981]' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {card.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Platform breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
              <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">bar_chart</span>
                Response Rates by Platform
              </h3>
              <div className="space-y-5">
                {[
                  { plat: 'LinkedIn', rate: 46, color: 'bg-primary', sent: 742 },
                  { plat: 'Twitter / X', rate: 38, color: 'bg-on-surface-variant', sent: 489 },
                  { plat: 'Instagram', rate: 29, color: 'bg-tertiary', sent: 151 },
                  { plat: 'Email', rate: 22, color: 'bg-[#10b981]', sent: 100 }
                ].map((row, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-on-surface-variant">{row.plat} <span className="text-on-surface-variant/50 font-light">({row.sent} sent)</span></span>
                      <span className="text-on-surface font-bold">{row.rate}% response</span>
                    </div>
                    <div className="w-full bg-surface-container rounded-full h-2">
                      <div className={`h-2 rounded-full ${row.color}`} style={{ width: `${row.rate}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Performers List */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-title-md text-title-md text-on-surface mb-4">Top Hooks</h3>
                <div className="space-y-3">
                  {[
                    { type: 'Value-First', hook: 'Mockup / Loom video review', rate: '52%' },
                    { type: 'Question-Based', hook: 'Specific scaling advice query', rate: '47%' },
                    { type: 'Direct Playbook', hook: 'Social proof case study', rate: '41%' }
                  ].map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-xs p-3 bg-surface-container-low rounded-lg border border-outline-variant/60">
                      <div>
                        <div className="font-bold text-on-surface">{h.type}</div>
                        <div className="text-[10px] text-on-surface-variant mt-0.5">{h.hook}</div>
                      </div>
                      <span className="text-primary font-bold bg-primary/10 px-2 py-0.5 rounded">{h.rate}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => navigate('/generator')}
                className="mt-6 w-full text-center text-xs text-primary hover:underline font-medium cursor-pointer"
              >
                Generate with top hooks →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
