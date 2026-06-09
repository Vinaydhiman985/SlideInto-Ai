import React, { useState, useRef } from 'react';

export default function BulkMode({ activeTab, setActiveTab }) {
  const [queuedItems, setQueuedItems] = useState([
    { id: 1, name: 'Alex Mercer', title: 'VP of Engineering', company: 'TechFlow Inc.', status: 'Ready', statusColor: 'bg-[#10b981]' },
    { id: 2, name: 'Sarah Chen', title: 'Director of Product', company: 'Innovate Solutions', status: 'Ready', statusColor: 'bg-[#10b981]' },
    { id: 3, name: 'Marcus Rodriguez', title: 'Missing Title', company: 'Global Logistics', status: 'Missing Info', statusColor: 'bg-[#f59e0b]' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleDelete = (id) => {
    setQueuedItems(queuedItems.filter(item => item.id !== id));
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      simulateFileUpload(file.name);
    }
  };

  const simulateFileUpload = (filename) => {
    // Show a mock upload state
    const newItems = [
      { id: Date.now() + 1, name: 'Liam Neeson', title: 'Managing Director', company: 'Enterprise Scale', status: 'Ready', statusColor: 'bg-[#10b981]' },
      { id: Date.now() + 2, name: 'Emma Watson', title: 'Marketing Lead', company: 'Creative Labs', status: 'Ready', statusColor: 'bg-[#10b981]' },
      { id: Date.now() + 3, name: 'David Beckham', title: 'VP Growth', company: 'Sportify', status: 'Ready', statusColor: 'bg-[#10b981]' }
    ];
    setQueuedItems([...queuedItems, ...newItems]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateFileUpload(e.dataTransfer.files[0].name);
    }
  };

  const startBulkGeneration = () => {
    const readyItems = queuedItems.filter(i => i.status === 'Ready');
    if (readyItems.length === 0) {
      alert("No ready profiles to process!");
      return;
    }
    
    setIsProcessing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          // Mark all ready items as completed
          setQueuedItems(current => current.map(item => {
            if (item.status === 'Ready') {
              return { ...item, status: 'Completed', statusColor: 'bg-indigo-500' };
            }
            return item;
          }));
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="bg-surface text-on-surface flex min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept=".csv,.xls,.xlsx" 
        className="hidden" 
      />

      {/* SideNavBar (Desktop Only) */}
      <nav className="hidden md:flex flex-col py-margin-desktop px-gutter bg-surface-container-lowest border-r border-outline-variant w-[240px] h-screen fixed left-0 top-0 z-40">
        <div className="mb-10">
          <h1 className="font-headline-sm text-headline-sm font-bold text-primary">SlideInto</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Ghostwriter AI</p>
        </div>
        <div className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 font-body-md text-body-md transition-colors active:scale-95 duration-200 rounded-lg text-left ${
              activeTab === 'dashboard' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>dashboard</span>
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('generator')}
            className={`w-full flex items-center gap-3 px-3 py-2 font-body-md text-body-md transition-colors active:scale-95 duration-200 rounded-lg text-left ${
              activeTab === 'generator' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>bolt</span>
            Generate DM
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center gap-3 px-3 py-2 font-body-md text-body-md transition-colors active:scale-95 duration-200 rounded-lg text-left ${
              activeTab === 'history' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>history</span>
            History
          </button>
          <button 
            onClick={() => setActiveTab('bulk')}
            className={`w-full flex items-center gap-3 px-3 py-2 font-body-md text-body-md transition-colors active:scale-95 duration-200 rounded-lg text-left ${
              activeTab === 'bulk' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
            Bulk Mode
          </button>
          <button 
            onClick={() => setActiveTab('extension')}
            className={`w-full flex items-center gap-3 px-3 py-2 font-body-md text-body-md transition-colors active:scale-95 duration-200 rounded-lg text-left ${
              activeTab === 'extension' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>extension</span>
            Chrome Extension
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2 font-body-md text-body-md transition-colors active:scale-95 duration-200 rounded-lg text-left ${
              activeTab === 'settings' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>settings</span>
            Settings
          </button>
        </div>
        <div className="mt-auto space-y-4">
          <button className="w-full py-2 px-4 bg-primary-container text-on-primary-container font-body-sm text-body-sm rounded-lg hover:bg-surface-tint hover:text-on-primary transition-colors flex items-center justify-center gap-2">
            Upgrade to Pro
            <span className="material-symbols-outlined text-[16px]">stars</span>
          </button>
          <div className="space-y-2 border-t border-outline-variant pt-4">
            <a className="flex items-center gap-3 px-3 py-2 font-body-md text-body-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors rounded-lg" href="#">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>help</span>
              Help Center
            </a>
            <a className="flex items-center gap-3 px-3 py-2 font-body-md text-body-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors rounded-lg" href="#">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>logout</span>
              Log Out
            </a>
          </div>
        </div>
      </nav>

      {/* TopAppBar (Mobile Only - Fallback Nav) */}
      <header className="md:hidden flex justify-between items-center h-16 px-gutter fixed top-0 w-full z-50 bg-surface border-b border-outline-variant">
        <h1 className="font-headline-sm text-headline-sm font-black text-on-surface">SlideInto</h1>
        <button className="text-on-surface-variant">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 md:ml-[240px] pt-20 md:pt-margin-desktop px-margin-mobile md:px-gutter max-w-container-max mx-auto pb-20 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Bulk Mode</h2>
              <span className="bg-secondary-container text-on-secondary-container font-label-caps text-label-caps px-2 py-1 rounded">PRO</span>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Upload a CSV or Excel file to process multiple profiles simultaneously.</p>
          </div>
          <button 
            onClick={startBulkGeneration}
            disabled={isProcessing}
            className="flex items-center justify-center gap-2 bg-primary-container text-on-primary-container hover:bg-surface-tint hover:text-on-primary font-body-sm text-body-sm px-6 py-3 rounded-lg transition-colors shadow-sm disabled:opacity-50"
          >
            <span className="material-symbols-outlined">{isProcessing ? 'sync' : 'play_arrow'}</span>
            {isProcessing ? `Generating (${progress}%)` : 'Start Bulk Generation'}
          </button>
        </div>

        {isProcessing && (
          <div className="w-full bg-surface-container rounded-full h-2 mb-8 overflow-hidden">
            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        )}

        {/* Drag & Drop Area */}
        <div 
          onClick={handleBrowseClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="bg-surface-container-lowest border-2 border-dashed border-outline-variant rounded-xl p-12 text-center flex flex-col items-center justify-center mb-8 hover:border-primary-fixed-dim hover:bg-surface-container-low transition-all cursor-pointer group"
        >
          <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4 group-hover:bg-secondary-fixed transition-colors">
            <span className="material-symbols-outlined text-[32px] text-tertiary group-hover:text-primary">cloud_upload</span>
          </div>
          <h3 className="font-title-md text-title-md text-on-surface mb-2">Drag and drop your file here</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">Supports .csv, .xls, .xlsx (Max 500 rows per batch)</p>
          <button className="bg-surface-container-high text-on-surface font-body-sm text-body-sm px-4 py-2 rounded-lg border border-outline-variant hover:bg-surface-variant transition-colors">
            Browse Files
          </button>
        </div>

        {/* Status Panel */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-[0px_4px_12px_rgba(0,0,0,0.02)]">
          <div className="border-b border-outline-variant px-6 py-4 flex justify-between items-center bg-surface-bright">
            <h3 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">list_alt</span>
              Queued Profiles
            </h3>
            <span className="font-mono-label text-mono-label text-on-surface-variant bg-surface-container px-2 py-1 rounded">{queuedItems.length} Profiles</span>
          </div>
          
          <div className="w-full">
            {/* Header Row */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-outline-variant bg-surface-container-lowest font-label-caps text-label-caps text-on-surface-variant">
              <div className="col-span-2">Status</div>
              <div className="col-span-3">Name</div>
              <div className="col-span-3">Title</div>
              <div className="col-span-3">Company</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            {/* List Items */}
            <div className="divide-y divide-outline-variant">
              {queuedItems.length === 0 ? (
                <div className="p-8 text-center text-on-surface-variant font-body-md">No profiles queued. Upload a file to start.</div>
              ) : (
                queuedItems.map(item => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-surface-container-low transition-colors">
                    <div className="col-span-2 flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.statusColor}`}></span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant capitalize">{item.status}</span>
                    </div>
                    <div className="col-span-3 font-body-sm text-body-sm font-medium text-on-surface">{item.name}</div>
                    <div className={`col-span-3 font-body-sm text-body-sm truncate ${item.status === 'Missing Info' ? 'text-error' : 'text-on-surface-variant'}`}>
                      {item.title}
                    </div>
                    <div className="col-span-3 font-body-sm text-body-sm text-on-surface-variant">{item.company}</div>
                    <div className="col-span-1 flex justify-end">
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="text-on-surface-variant hover:text-error transition-colors p-1"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="p-4 border-t border-outline-variant bg-surface-container-low flex justify-between items-center">
            <span className="font-body-sm text-body-sm text-on-surface-variant">Showing {queuedItems.length} items</span>
            <button 
              onClick={startBulkGeneration}
              disabled={isProcessing}
              className="md:hidden bg-primary-container text-on-primary-container font-body-sm text-body-sm px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              Start
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
