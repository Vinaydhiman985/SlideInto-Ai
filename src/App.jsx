import React, { useState, useEffect } from 'react'
import BulkMode from './components/BulkMode.jsx'
import ChromeExtension from './components/ChromeExtension.jsx'
import GenerateDM from './components/GenerateDM.jsx'
import HelpCenter from './components/HelpCenter.jsx'
import LandingPage from './components/LandingPage.jsx'
import MobileLandingPage from './components/MobileLandingPage.jsx'
import MobileLandingPageStatic from './components/MobileLandingPageStatic.jsx'
import DesktopLandingPage from './components/DesktopLandingPage.jsx'
import Login from './components/Login.jsx'
import Settings from './components/Settings.jsx'
import UpgradeToPro from './components/UpgradeToPro.jsx'

export default function App() {
  const [activeTab, setActiveTab] = useState('landing') // landing, login, dashboard, generator, history, bulk, extension, settings
  const [platform, setPlatform] = useState('linkedin')
  const [recipientRole, setRecipientRole] = useState('SaaS Founder')
  const [purpose, setPurpose] = useState('Pitching a partnership')
  const [tone, setTone] = useState('casual')
  const [customContext, setCustomContext] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedDMs, setGeneratedDMs] = useState([])
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [toastMessage, setToastMessage] = useState('')
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Saved collection state
  const [savedTemplates, setSavedTemplates] = useState([
    {
      id: 1,
      platform: 'linkedin',
      recipientRole: 'Venture Capitalist',
      text: "Hey Sarah, loved your recent post on SaaS valuation trends. I'm building SlideInto, automating high-converting outreach. We're seeing a 38% response rate. Would love to send a quick 2-min demo video if you're open to it?",
      score: 92,
      savedAt: '2 hours ago'
    },
    {
      id: 2,
      platform: 'twitter',
      recipientRole: 'Creator',
      text: "Yo Alex! Been following your design system threads. Clean stuff. Just launched an AI copywriter for cold outreach. Think it would save your agency 10+ hrs/wk. Can I drop a quick Loom link here?",
      score: 89,
      savedAt: 'Yesterday'
    }
  ])

  // Settings state
  const [settings, setSettings] = useState({
    userName: 'John Doe',
    apiKey: 'sk_live_••••••••••••••••••••3a9b',
    autoSignature: true,
    signatureText: 'Best, John',
    linkedInConnected: true,
    twitterConnected: false
  })

  // Pre-generate templates on startup
  useEffect(() => {
    generateTemplates(platform, recipientRole, purpose, tone, customContext, false)
  }, [])

  const showToast = (message) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage('')
    }, 3000)
  }

  const generateTemplates = (plat, role, purp, t, context, simulateLoading = true) => {
    if (simulateLoading) {
      setIsGenerating(true)
    }

    const runGeneration = () => {
      const cText = context ? ` regarding "${context}"` : ''
      const greetings = {
        linkedin: {
          professional: `Hi {Name},`,
          casual: `Hey {Name},`,
          direct: `{Name},`,
          empathetic: `Hi {Name}, hope you're having a productive week.`,
          creative: `Hi {Name} 👋, Quick question from a fellow builder:`
        },
        twitter: {
          professional: `Hi {Name},`,
          casual: `Hey {Name}!`,
          direct: `Hey {Name} -`,
          empathetic: `Hey {Name}, hope your week is off to a great start.`,
          creative: `Yo {Name}! 🚀`
        },
        instagram: {
          professional: `Hello {Name},`,
          casual: `Hey {Name}! 👋`,
          direct: `Hey {Name} -`,
          empathetic: `Hey {Name}, love your content.`,
          creative: `Yo {Name}! Quick one for you:`
        },
        email: {
          professional: `Dear {Name},`,
          casual: `Hi {Name},`,
          direct: `Hi {Name},`,
          empathetic: `Hi {Name}, I know you're busy, so I'll keep this brief.`,
          creative: `Hey {Name},`
        }
      }

      const greeting = greetings[plat][t] || `Hey {Name},`
      let options = []

      if (purp.toLowerCase().includes('partnership') || purp.toLowerCase().includes('pitch')) {
        options = [
          {
            title: "The Social Proof Hook",
            text: `${greeting} noticed your work in the ${role} space. We recently helped a similar team boost their response rates by 42% through automated personalized DMs${cText}. Would love to share our 1-page playbook with you. Interested?`,
            score: 88,
            metrics: { hook: 'High', length: 'Short', cta: 'Soft' }
          },
          {
            title: "The Value-First Approach",
            text: `${greeting} put together a quick mockup of how we could optimize the user acquisition flow for your team. Zero sales pitch, just wanted to share the design${cText}. Can I drop the link here?`,
            score: 94,
            metrics: { hook: 'Excellent', length: 'Medium', cta: 'Curiosity' }
          },
          {
            title: "The Direct Value-Add",
            text: `${greeting} I know you're focused on growth. We built a tool that automates cold outreach${cText} with hyper-personalized hooks. Are you open to looking at a 45-second video showing how it works? No pressure at all.`,
            score: 85,
            metrics: { hook: 'Good', length: 'Short', cta: 'Direct' }
          }
        ]
      } else {
        options = [
          {
            title: "The Specific Question",
            text: `${greeting} read your recent article on scaling engineering teams. I had a quick question: how do you balance speed vs quality in early hires${cText}? Would love to buy you a virtual coffee for 10 mins if you have time next week.`,
            score: 91,
            metrics: { hook: 'Specific', length: 'Short', cta: 'Soft' }
          },
          {
            title: "The Personalized Observation",
            text: `${greeting} noticed your team just expanded its outreach efforts${cText}. We built a workflow that cuts writing time by 75% for cold DMs. Made a quick outline of how you guys could implement this. Let me know if I can drop it over!`,
            score: 90,
            metrics: { hook: 'Observation', length: 'Medium', cta: 'Soft' }
          },
          {
            title: "The Low-Friction Request",
            text: `${greeting} hope this isn't out of the blue. I'm building a platform to optimize cold messages${cText}. Since you're a seasoned ${role}, I'd value your quick thoughts on it. Can I send a 30-second explanation link?`,
            score: 86,
            metrics: { hook: 'Low Friction', length: 'Short', cta: 'Permission' }
          }
        ]
      }

      setGeneratedDMs(options)
      if (simulateLoading) {
        setIsGenerating(false)
        showToast('AI templates generated successfully!')
      }
    }

    if (simulateLoading) {
      setTimeout(runGeneration, 800)
    } else {
      runGeneration()
    }
  }

  const handleGenerate = (e) => {
    e.preventDefault()
    generateTemplates(platform, recipientRole, purpose, tone, customContext, true)
  }

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    showToast('Copied to clipboard!')
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleSave = (dm) => {
    const isAlreadySaved = savedTemplates.some(t => t.text === dm.text)
    if (isAlreadySaved) {
      showToast('Template is already saved!')
      return
    }

    const newTemplate = {
      id: Date.now(),
      platform,
      recipientRole,
      text: dm.text,
      score: dm.score,
      savedAt: 'Just now'
    }
    setSavedTemplates([newTemplate, ...savedTemplates])
    showToast('Saved to your collection!')
  }

  const handleRemoveSaved = (id) => {
    setSavedTemplates(savedTemplates.filter(t => t.id !== id))
    showToast('Template removed.')
  }

  // Common Sidebar Navigation component code matching BulkMode
  const renderSidebar = () => {
    return (
      <nav className="hidden md:flex flex-col py-margin-desktop px-gutter bg-surface-container-lowest border-r border-outline-variant w-[240px] h-screen fixed left-0 top-0 z-40">
        <div className="mb-10">
          <h1 className="font-headline-sm text-headline-sm font-bold text-primary">SlideInto</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Ghostwriter AI</p>
        </div>
        <div className="flex-1 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', fill: false },
            { id: 'generator', label: 'Generate DM', icon: 'bolt', fill: false },
            { id: 'history', label: 'History', icon: 'history', fill: false },
            { id: 'bulk', label: 'Bulk Mode', icon: 'rocket_launch', fill: activeTab === 'bulk' },
            { id: 'extension', label: 'Chrome Extension', icon: 'extension', fill: false },
            { id: 'settings', label: 'Settings', icon: 'settings', fill: false }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 font-body-md text-body-md transition-colors active:scale-95 duration-200 rounded-lg text-left ${
                activeTab === item.id
                  ? 'bg-secondary-container text-on-secondary-container font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: `'_FILL' ${activeTab === item.id || item.fill ? 1 : 0}` }}>
                {item.icon}
              </span>
              {item.label}
              {item.id === 'bulk' && (
                <span className="ml-auto bg-primary text-on-primary text-[9px] px-1.5 py-0.2 rounded font-bold">PRO</span>
              )}
            </button>
          ))}
        </div>
        <div className="mt-auto space-y-4">
          <button 
            onClick={() => setActiveTab('upgrade')}
            className="w-full py-2 px-4 bg-primary-container text-on-primary-container font-body-sm text-body-sm rounded-lg hover:bg-surface-tint hover:text-on-primary transition-colors flex items-center justify-center gap-2"
          >
            Upgrade to Pro
            <span className="material-symbols-outlined text-[16px]">stars</span>
          </button>
          <div className="space-y-2 border-t border-outline-variant pt-4">
            <button 
              onClick={() => setActiveTab('help')}
              className={`w-full flex items-center gap-3 px-3 py-2 font-body-md text-body-md transition-colors rounded-lg text-left ${
                activeTab === 'help' ? 'bg-secondary-container text-on-secondary-container font-semibold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>help</span>
              Help Center
            </button>
            <button 
              onClick={() => setActiveTab('landing')}
              className="w-full flex items-center gap-3 px-3 py-2 font-body-md text-body-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors rounded-lg text-left"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>logout</span>
              Log Out
            </button>
          </div>
        </div>
      </nav>
    )
  }

  // Render Mobile Header
  const renderMobileHeader = () => {
    return (
      <header className="md:hidden flex justify-between items-center h-16 px-gutter fixed top-0 w-full z-50 bg-surface border-b border-outline-variant">
        <h1 className="font-headline-sm text-headline-sm font-black text-on-surface">SlideInto</h1>
        <div className="flex gap-2">
          {['generator', 'bulk'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs px-2.5 py-1 rounded ${activeTab === tab ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant'}`}
            >
              {tab === 'generator' ? 'Generator' : 'Bulk'}
            </button>
          ))}
        </div>
      </header>
    )
  }

  // Switch to LandingPage component if tab is landing (supports mobile and desktop layouts)
  if (activeTab === 'landing') {
    return isMobile ? (
      <MobileLandingPage setActiveTab={setActiveTab} />
    ) : (
      <LandingPage setActiveTab={setActiveTab} />
    )
  }

  // Switch to Login component if tab is login
  if (activeTab === 'login') {
    return <Login setActiveTab={setActiveTab} />
  }

  // Switch to BulkMode component directly to avoid duplication of state and DOM
  if (activeTab === 'bulk') {
    return <BulkMode activeTab={activeTab} setActiveTab={setActiveTab} />
  }

  if (activeTab === 'extension') {
    return <ChromeExtension activeTab={activeTab} setActiveTab={setActiveTab} />
  }

  if (activeTab === 'generator') {
    return <GenerateDM activeTab={activeTab} setActiveTab={setActiveTab} />
  }

  if (activeTab === 'help') {
    return <HelpCenter activeTab={activeTab} setActiveTab={setActiveTab} />
  }

  if (activeTab === 'settings') {
    return <Settings activeTab={activeTab} setActiveTab={setActiveTab} />
  }

  if (activeTab === 'upgrade') {
    return <UpgradeToPro activeTab={activeTab} setActiveTab={setActiveTab} />
  }

  return (
    <div className="bg-surface text-on-surface flex min-h-screen">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center bg-surface-container-highest border border-outline px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md transition-all">
          <div className="h-2 w-2 rounded-full bg-primary mr-3 animate-ping" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* SideNavBar (Desktop Only) */}
      {renderSidebar()}

      {/* TopAppBar (Mobile Only) */}
      {renderMobileHeader()}

      {/* Main Content Canvas */}
      <main className="flex-1 md:ml-[240px] pt-20 md:pt-margin-desktop px-margin-mobile md:px-gutter max-w-container-max mx-auto pb-20 w-full">
        
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">Performance Analytics</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Real-time stats from your synchronized cold DM pipelines.</p>
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
                  onClick={() => setActiveTab('generator')}
                  className="mt-6 w-full text-center text-xs text-primary hover:underline font-medium"
                >
                  Generate with top hooks →
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Parameters - 5 Columns */}
            <div className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">psychology</span>
                  AI Writer Parameters
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Configure outreach options to generate high-converting cold DMs.</p>
              </div>

              <form onSubmit={handleGenerate} className="space-y-5">
                
                {/* Platform Selection */}
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Target Platform</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin' },
                      { id: 'twitter', label: 'Twitter / X', icon: 'twitter' },
                      { id: 'instagram', label: 'Instagram', icon: 'instagram' },
                      { id: 'email', label: 'Email', icon: 'mail' }
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPlatform(p.id)}
                        className={`p-3 rounded-lg border text-center transition-all flex flex-col items-center justify-center space-y-1.5 ${
                          platform === p.id
                            ? 'bg-primary/15 border-primary text-primary font-medium shadow-inner'
                            : 'bg-surface-container-low border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-outline'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {p.icon === 'linkedin' ? 'badge' : p.icon === 'twitter' ? 'alternate_email' : p.icon === 'instagram' ? 'photo_camera' : 'mail'}
                        </span>
                        <span className="text-[10px] tracking-tight">{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recipient Profile / Role */}
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Recipient Profile/Role</label>
                  <input
                    type="text"
                    value={recipientRole}
                    onChange={(e) => setRecipientRole(e.target.value)}
                    placeholder="e.g. SaaS Founder, Venture Capitalist"
                    className="w-full bg-surface-container-low border border-outline-variant focus:border-primary rounded-lg px-4 py-2.5 text-sm text-on-surface placeholder-on-surface-variant/40 outline-none transition-all"
                    required
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {['SaaS Founder', 'Venture Capitalist', 'Creator', 'Head of Sales'].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setRecipientRole(role)}
                        className="text-[10px] bg-surface-container border border-outline-variant text-on-surface-variant px-2.5 py-1 rounded-full hover:border-outline hover:text-on-surface transition-all"
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Outreach Purpose */}
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Offer / Purpose</label>
                  <input
                    type="text"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="e.g. Pitching a partnership, coffee chat"
                    className="w-full bg-surface-container-low border border-outline-variant focus:border-primary rounded-lg px-4 py-2.5 text-sm text-on-surface placeholder-on-surface-variant/40 outline-none transition-all"
                    required
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {['Pitching a partnership', 'Requesting a coffee chat', 'Getting feedback on a tool'].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPurpose(p)}
                        className="text-[10px] bg-surface-container border border-outline-variant text-on-surface-variant px-2.5 py-1 rounded-full hover:border-outline hover:text-on-surface transition-all"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tone Select */}
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Tone of Voice</label>
                  <div className="grid grid-cols-5 gap-1">
                    {[
                      { id: 'casual', label: 'Casual' },
                      { id: 'professional', label: 'Formal' },
                      { id: 'direct', label: 'Direct' },
                      { id: 'empathetic', label: 'Warm' },
                      { id: 'creative', label: 'Witty' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTone(t.id)}
                        className={`py-2 px-1 text-center rounded-lg border text-[11px] transition-all ${
                          tone === t.id
                            ? 'bg-primary/15 border-primary text-primary font-medium shadow-inner'
                            : 'bg-surface-container-low border-outline-variant text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Context */}
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Custom Context / Keywords (Optional)</label>
                  <textarea
                    value={customContext}
                    onChange={(e) => setCustomContext(e.target.value)}
                    placeholder="e.g. refer to their recent tweet or blog post"
                    rows={3}
                    className="w-full bg-surface-container-low border border-outline-variant focus:border-primary rounded-lg px-4 py-2.5 text-sm text-on-surface placeholder-on-surface-variant/40 outline-none transition-all resize-none"
                  />
                </div>

                {/* Generate Button */}
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full bg-primary text-on-primary hover:bg-surface-tint font-bold text-sm py-3 px-4 rounded-lg shadow-sm active:scale-95 duration-200 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
                      <span>Drafting Outreach...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">bolt</span>
                      <span>Generate Templates</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* AI Output Panels - 7 Columns */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">auto_awesome</span>
                  Draft Options
                </h2>
                <span className="font-mono-label text-mono-label text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">Claude 3.5 Active</span>
              </div>

              {isGenerating ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 space-y-4 animate-pulse">
                      <div className="flex justify-between items-center">
                        <div className="h-4 bg-surface-container rounded w-1/4" />
                        <div className="h-6 bg-surface-container rounded-full w-12" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-surface-container rounded w-full" />
                        <div className="h-3 bg-surface-container rounded w-5/6" />
                      </div>
                      <div className="h-10 bg-surface-container rounded-lg w-full" />
                    </div>
                  ))}
                </div>
              ) : generatedDMs.length > 0 ? (
                <div className="space-y-4 animate-fade-in">
                  {generatedDMs.map((dm, idx) => (
                    <div
                      key={idx}
                      className="group bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant hover:border-outline rounded-xl p-6 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="font-mono-label text-[10px] text-on-surface-variant font-semibold">SUGGESTION {idx + 1}</span>
                          <h3 className="font-title-md text-sm font-semibold text-on-surface mt-0.5">{dm.title}</h3>
                        </div>
                        <div className={`font-mono-label text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-secondary-container text-on-secondary-container border border-outline-variant`}>
                          Score: {dm.score}%
                        </div>
                      </div>

                      {/* Monospaced DM Preview */}
                      <div className="font-mono text-dm-preview bg-surface-container border border-outline-variant rounded-lg p-4 text-on-surface/90 leading-relaxed mb-4 select-all">
                        {dm.text}
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-surface-container-low rounded-lg font-mono-label text-[11px] text-on-surface-variant border border-outline-variant mb-4">
                        <div>Hook: <span className="text-on-surface font-semibold">{dm.metrics.hook}</span></div>
                        <div>Length: <span className="text-on-surface font-semibold">{dm.metrics.length}</span></div>
                        <div>CTA: <span className="text-on-surface font-semibold">{dm.metrics.cta}</span></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => handleSave(dm)}
                          className="flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-on-surface transition-all py-1.5 px-3 rounded hover:bg-surface-container"
                        >
                          <span className="material-symbols-outlined text-[16px]">bookmark</span>
                          Save Template
                        </button>

                        <button
                          type="button"
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
                <div className="border-2 border-dashed border-outline-variant rounded-xl p-12 text-center">
                  <span className="material-symbols-outlined text-[36px] text-on-surface-variant/40 mb-4">draw</span>
                  <h3 className="font-title-md text-on-surface">No drafts generated yet</h3>
                  <p className="text-xs text-on-surface-variant mt-1">Fill out the writer parameters and press "Generate Templates".</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">Saved Collection</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Access your collection of high-converting messages.</p>
            </div>

            {savedTemplates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedTemplates.map((template) => (
                  <div key={template.id} className="bg-surface-container-lowest border border-outline-variant hover:border-outline rounded-xl p-6 flex flex-col justify-between shadow-sm relative group transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            template.platform === 'linkedin'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : 'bg-on-surface-variant/10 text-on-surface-variant border border-outline-variant'
                          }`}>
                            {template.platform}
                          </span>
                          <span className="text-xs text-on-surface-variant font-medium">to: {template.recipientRole}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveSaved(template.id)}
                          className="opacity-0 group-hover:opacity-100 text-on-surface-variant hover:text-error transition-all p-1 hover:bg-surface-container rounded"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                      <div className="font-mono text-dm-preview bg-surface-container border border-outline-variant rounded-lg p-4 text-on-surface/90 leading-relaxed mb-4">
                        {template.text}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-on-surface-variant pt-3 border-t border-outline-variant">
                      <span>Saved {template.savedAt}</span>
                      <button
                        onClick={() => handleCopy(template.text, template.id)}
                        className="text-primary hover:underline font-semibold flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">content_copy</span>
                        <span>Copy Text</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-outline-variant rounded-xl p-16 text-center">
                <span className="material-symbols-outlined text-[36px] text-on-surface-variant/40 mb-4">bookmark_border</span>
                <h3 className="font-title-md text-on-surface">No saved templates</h3>
                <p className="text-xs text-on-surface-variant mt-1">Save messages from the generator tab to store them here.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'extension' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in text-center py-8">
            <div>
              <span className="bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-full border border-primary/20">NOW AVAILABLE</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-4 mb-2">Chrome Extension</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">SlideInto directly from Twitter, LinkedIn, and Instagram profile pages.</p>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 text-left space-y-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                  <h3 className="font-title-md text-on-surface mb-1">Download and Install</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Get the extension zip from your dashboard and unzip. Navigate to <code>chrome://extensions</code>, enable Developer Mode, and click "Load unpacked".</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                  <h3 className="font-title-md text-on-surface mb-1">Visit any profile</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Open a profile on LinkedIn, Twitter, or Instagram. You will see a new "SlideInto" button floating near their bio.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 font-bold">3</div>
                <div>
                  <h3 className="font-title-md text-on-surface mb-1">Draft DMs instantly</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Click the button to extract profile info and draft a hyper-targeted outreach message in 2 seconds.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button className="bg-primary text-on-primary hover:bg-surface-tint font-bold text-sm px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
                <span className="material-symbols-outlined">download</span>
                Download Extension (.zip)
              </button>
              <button className="bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface-container-low font-bold text-sm px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
                <span className="material-symbols-outlined">chrome_reader_mode</span>
                Read Installation Guide
              </button>
            </div>
          </div>
        )}



      </main>

    </div>
  )
}
