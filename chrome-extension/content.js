// Helper to detect current platform
function getPlatform() {
  const host = window.location.hostname;
  if (host.includes('linkedin.com')) return 'linkedin';
  if (host.includes('twitter.com') || host.includes('x.com')) return 'twitter';
  if (host.includes('github.com')) return 'github';
  return 'unknown';
}

// Scrape profile details from active page DOM
function scrapeProfile() {
  const platform = getPlatform();
  const profileUrl = window.location.href;
  let name = '';
  let bio = '';

  if (platform === 'linkedin') {
    // Scrape LinkedIn profile details
    const nameEl = document.querySelector('h1.text-heading-xlarge');
    const headlineEl = document.querySelector('.text-body-medium');
    const aboutEl = document.querySelector('#about ~ .display-flex span');
    
    name = nameEl ? nameEl.textContent.trim() : '';
    bio = headlineEl ? headlineEl.textContent.trim() : '';
    if (aboutEl) {
      bio += ' | About: ' + aboutEl.textContent.trim();
    }
  } else if (platform === 'twitter') {
    // Scrape X/Twitter details
    const nameEl = document.querySelector('[data-testid="UserName"] span');
    const descEl = document.querySelector('[data-testid="UserDescription"]');
    
    name = nameEl ? nameEl.textContent.trim() : '';
    bio = descEl ? descEl.textContent.trim() : '';
  } else if (platform === 'github') {
    // Scrape GitHub profile details
    const nameEl = document.querySelector('.p-name');
    const nicknameEl = document.querySelector('.p-nickname');
    const bioEl = document.querySelector('.p-note');
    
    name = nameEl ? nameEl.textContent.trim() : (nicknameEl ? nicknameEl.textContent.trim() : '');
    bio = bioEl ? bioEl.textContent.trim() : '';
  }

  return {
    platform,
    profileUrl,
    name,
    bio: bio.substring(0, 500) // limit context size
  };
}

// Injects the SlideInto button next to platform buttons
function injectSlideIntoButton() {
  const platform = getPlatform();
  
  // Avoid duplicate injection
  if (document.getElementById('slideinto-injected-btn')) return;

  let anchorElement = null;
  let btnStyles = 'background-color: #3f40c7; color: white; border: none; border-radius: 9999px; padding: 6px 12px; font-weight: bold; font-size: 13px; display: inline-flex; align-items: center; gap: 4px; cursor: pointer; margin-left: 8px; transition: opacity 0.2s;';

  if (platform === 'linkedin') {
    // Look for top card action container
    anchorElement = document.querySelector('.pv-top-card-v2-ctas');
    if (!anchorElement) {
      anchorElement = document.querySelector('.pvs-profile-actions');
    }
  } else if (platform === 'twitter') {
    // Look for follow / edit profile buttons
    anchorElement = document.querySelector('[data-testid="UserName"] ~ div div[role="button"]');
    if (anchorElement) anchorElement = anchorElement.parentElement;
  }

  if (anchorElement) {
    const button = document.createElement('button');
    button.id = 'slideinto-injected-btn';
    button.style.cssText = btnStyles;
    button.innerHTML = '<span>⚡</span> SlideInto';
    
    button.addEventListener('click', (e) => {
      e.preventDefault();
      alert('SlideInto is ready! Click the SlideInto icon in your extension bar to draft your cold message.');
    });

    anchorElement.appendChild(button);
  }
}

// Locate and insert text into platform's active composer box
function insertText(text) {
  const platform = getPlatform();
  let composer = null;

  if (platform === 'linkedin') {
    // LinkedIn message chat composer
    composer = document.querySelector('.msg-form__contenteditable') || 
               document.querySelector('[contenteditable="true"]');
  } else if (platform === 'twitter') {
    // Twitter/X composer
    composer = document.querySelector('[data-testid="dmComposerTextInput"]') || 
               document.querySelector('[data-testid="tweetTextarea_0"]') ||
               document.querySelector('[contenteditable="true"]');
  } else if (platform === 'github') {
    // GitHub comment textarea
    composer = document.querySelector('#new_comment_field') || 
               document.querySelector('textarea');
  }

  if (!composer) {
    // Fallback: try finding any contenteditable or textarea visible
    composer = document.querySelector('[contenteditable="true"]') || 
               document.querySelector('textarea:focus') ||
               document.querySelector('textarea');
  }

  if (composer) {
    composer.focus();
    
    if (composer.tagName === 'INPUT' || composer.tagName === 'TEXTAREA') {
      const start = composer.selectionStart || 0;
      const end = composer.selectionEnd || 0;
      const val = composer.value;
      composer.value = val.substring(0, start) + text + val.substring(end);
      composer.selectionStart = composer.selectionEnd = start + text.length;
      
      // Trigger event inputs so SPA bindings capture it
      composer.dispatchEvent(new Event('input', { bubbles: true }));
      composer.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      // Contenteditable divs (LinkedIn, Twitter/X)
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const textNode = document.createTextNode(text);
        range.insertNode(textNode);
        
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        composer.innerText = text;
      }
      
      // Dispatch input event for React framework bindings
      composer.dispatchEvent(new Event('input', { bubbles: true }));
    }
    return { success: true };
  } else {
    return { success: false, error: 'Could not find active message composer on this page. Please click the message chat input box first.' };
  }
}

// Listen for messages from extension popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'scrape') {
    const data = scrapeProfile();
    sendResponse(data);
  } else if (message.action === 'insert') {
    const result = insertText(message.text);
    sendResponse(result);
  }
  return true; // Keep channel open for async responses
});

// Periodic injection check
setInterval(injectSlideIntoButton, 2000);
