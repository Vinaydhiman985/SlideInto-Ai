import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loadingForm, setLoadingForm] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoadingForm(true);

    try {
      if (isSignup) {
        await register(email, password, name);
      } else {
        await login(email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoadingForm(false);
    }
  };

  const handleLinkedInMockLogin = () => {
    setError('LinkedIn Auth requires Chrome Extension. Please log in below via email.');
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
            onClick={() => navigate('/')}
            className="font-display-lg text-display-lg text-primary tracking-tighter cursor-pointer border-none bg-transparent outline-none"
          >
            SlideInto
          </button>
        </div>

        {/* Auth Card */}
        <div className="glass-panel rounded-xl border border-outline-variant/30 shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8 md:p-10">
          <div className="mb-8 text-center">
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">
              {isSignup ? 'Create Account' : 'Login to SlideInto'}
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {isSignup ? 'Sign up to start crafting personalized DMs.' : 'Welcome back. Continue to your dashboard.'}
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-error-container text-on-error-container text-xs font-semibold border border-error/20">
              {error}
            </div>
          )}

          {/* Primary Action */}
          <button 
            onClick={handleLinkedInMockLogin}
            className="w-full flex items-center justify-center gap-3 bg-primary-container hover:bg-primary-fixed-variant text-on-primary transition-all duration-200 py-3 px-4 rounded-lg font-mono-label text-mono-label group shadow-sm cursor-pointer" 
            type="button"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
            {isSignup ? 'Sign up with LinkedIn' : 'Login with LinkedIn'}
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-outline-variant/40"></div>
            <span className="px-4 font-label-caps text-label-caps text-outline bg-transparent uppercase text-xs">Or</span>
            <div className="flex-1 border-t border-outline-variant/40"></div>
          </div>

          {/* Form Action */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {isSignup && (
              <div className="space-y-1.5">
                <label className="block font-mono-label text-mono-label text-on-surface text-xs" htmlFor="name">Full Name</label>
                <input 
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2.5 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/20 transition-all placeholder:text-outline/60 outline-none" 
                  id="name" 
                  placeholder="John Doe" 
                  required 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block font-mono-label text-mono-label text-on-surface text-xs" htmlFor="email">Email Address</label>
              <input 
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2.5 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/20 transition-all placeholder:text-outline/60 outline-none" 
                id="email" 
                placeholder="name@company.com" 
                required 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block font-mono-label text-mono-label text-on-surface text-xs" htmlFor="password">Password</label>
                {!isSignup && (
                  <a className="font-mono-label text-mono-label text-primary hover:text-on-primary-fixed-variant transition-colors text-xs" href="#">Forgot Password?</a>
                )}
              </div>
              <input 
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2.5 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/20 transition-all placeholder:text-outline/60 outline-none" 
                id="password" 
                placeholder="••••••••" 
                required 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="pt-2">
              <button 
                className="w-full bg-surface hover:bg-surface-container-low border border-outline-variant text-on-surface py-3 px-4 rounded-lg font-mono-label text-mono-label transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2" 
                type="submit"
                disabled={loadingForm}
              >
                {loadingForm && (
                  <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
                )}
                {isSignup ? 'Sign Up with Email' : 'Login with Email'}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-8">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}&nbsp;
            <button 
              onClick={() => {
                setError('');
                setIsSignup(!isSignup);
              }}
              className="font-mono-label text-mono-label text-primary hover:text-on-primary-fixed-variant transition-colors ml-1 border-b border-transparent hover:border-primary cursor-pointer text-xs"
            >
              {isSignup ? 'Login' : 'Sign up'}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
