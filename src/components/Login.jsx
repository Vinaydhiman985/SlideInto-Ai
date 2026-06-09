import React from 'react';

export default function Login({ setActiveTab }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (setActiveTab) {
      setActiveTab('generator');
    }
  };

  const handleLinkedInLogin = () => {
    if (setActiveTab) {
      setActiveTab('generator');
    }
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex items-center justify-center relative overflow-hidden font-body-lg w-full">
      <style dangerouslySetInnerHTML={{
        __html: `
        .glass-panel {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
        }
      `}} />

      {/* Atmospheric Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-primary-fixed-dim opacity-25 blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-[40%] -right-[20%] w-[70vw] h-[70vw] rounded-full bg-secondary-fixed opacity-25 blur-[140px] mix-blend-multiply"></div>
      </div>

      {/* Main Content Canvas */}
      <main className="w-full max-w-[440px] mx-auto px-margin-mobile md:px-0 relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <button 
            onClick={() => setActiveTab && setActiveTab('landing')}
            className="font-display-lg text-display-lg text-primary tracking-tighter cursor-pointer"
          >
            SlideInto
          </button>
        </div>

        {/* Auth Card */}
        <div className="glass-panel rounded-xl border border-outline-variant/30 shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8 md:p-10">
          <div className="mb-8 text-center">
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Login to SlideInto</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Welcome back. Continue to your dashboard.</p>
          </div>

          {/* Primary Action */}
          <button 
            onClick={handleLinkedInLogin}
            className="w-full flex items-center justify-center gap-3 bg-primary-container hover:bg-primary-fixed-variant text-on-primary transition-all duration-200 py-3 px-4 rounded-lg font-mono-label text-mono-label group shadow-sm cursor-pointer" 
            type="button"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
            Login with LinkedIn
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-outline-variant/40"></div>
            <span className="px-4 font-label-caps text-label-caps text-outline bg-transparent uppercase text-xs">Or</span>
            <div className="flex-1 border-t border-outline-variant/40"></div>
          </div>

          {/* Secondary Form Action */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="block font-mono-label text-mono-label text-on-surface text-xs" htmlFor="email">Email Address</label>
              <input 
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2.5 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/20 transition-all placeholder:text-outline/60 outline-none" 
                id="email" 
                placeholder="name@company.com" 
                required 
                type="email"
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block font-mono-label text-mono-label text-on-surface text-xs" htmlFor="password">Password</label>
                <a className="font-mono-label text-mono-label text-primary hover:text-on-primary-fixed-variant transition-colors text-xs" href="#">Forgot Password?</a>
              </div>
              <input 
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2.5 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/20 transition-all placeholder:text-outline/60 outline-none" 
                id="password" 
                placeholder="••••••••" 
                required 
                type="password"
              />
            </div>

            <div className="pt-2">
              <button 
                className="w-full bg-surface hover:bg-surface-container-low border border-outline-variant text-on-surface py-3 px-4 rounded-lg font-mono-label text-mono-label transition-colors shadow-sm cursor-pointer" 
                type="submit"
              >
                Login with Email
              </button>
            </div>
          </form>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-8">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Don't have an account?&nbsp;
            <button 
              onClick={handleLinkedInLogin}
              className="font-mono-label text-mono-label text-primary hover:text-on-primary-fixed-variant transition-colors ml-1 border-b border-transparent hover:border-primary cursor-pointer text-xs"
            >
              Sign up
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
