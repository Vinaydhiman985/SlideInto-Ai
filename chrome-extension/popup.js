const API_URL = 'http://localhost:5000';

document.addEventListener('DOMContentLoaded', async () => {
  // Elements
  const authView = document.getElementById('auth-view');
  const generatorView = document.getElementById('generator-view');
  const loginForm = document.getElementById('login-form');
  const generatorForm = document.getElementById('generator-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginSubmit = document.getElementById('login-submit');
  const generateSubmit = document.getElementById('generate-submit');
  const profileUrlInput = document.getElementById('profile-url');
  const outreachGoalSelect = document.getElementById('outreach-goal');
  const contextBioInput = document.getElementById('context-bio');
  const userGreeting = document.getElementById('user-greeting');
  const logoutBtn = document.getElementById('logout-btn');
  const errorAlert = document.getElementById('error-alert');
  const successAlert = document.getElementById('success-alert');
  const outputsContainer = document.getElementById('outputs-container');
  const variantsList = document.getElementById('variants-list');

  // Load state
  let token = null;
  let user = null;

  // Helper alerts
  const showError = (msg) => {
    errorAlert.textContent = msg;
    errorAlert.classList.remove('hidden');
    setTimeout(() => errorAlert.classList.add('hidden'), 5000);
  };

  const showSuccess = (msg) => {
    successAlert.textContent = msg;
    successAlert.classList.remove('hidden');
    setTimeout(() => successAlert.classList.add('hidden'), 3000);
  };

  // Check Auth State
  const checkAuth = async () => {
    chrome.storage.local.get(['token', 'user'], (result) => {
      if (result.token) {
        token = result.token;
        user = result.user;
        userGreeting.textContent = `Hello, ${user?.name || 'User'}!`;
        authView.classList.add('hidden');
        generatorView.classList.remove('hidden');
        autoDetectProfile();
      } else {
        authView.classList.remove('hidden');
        generatorView.classList.add('hidden');
      }
    });
  };

  // Perform Login
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginSubmit.disabled = true;
    loginSubmit.innerHTML = '<div class="loading-spinner"></div>';
    
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailInput.value,
          password: passwordInput.value
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed.');
      }

      chrome.storage.local.set({ token: data.token, user: data.user }, () => {
        checkAuth();
      });
    } catch (err) {
      showError(err.message);
    } finally {
      loginSubmit.disabled = false;
      loginSubmit.textContent = 'Log In';
    }
  });

  // Perform Logout
  logoutBtn.addEventListener('click', () => {
    chrome.storage.local.remove(['token', 'user'], () => {
      token = null;
      user = null;
      outputsContainer.classList.add('hidden');
      checkAuth();
    });
  });

  // Autodetect profile details from active tab content script
  const autoDetectProfile = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'scrape' }, (response) => {
          if (chrome.runtime.lastError) {
            console.log('Content script not active on this tab:', chrome.runtime.lastError.message);
            return;
          }
          if (response) {
            if (response.profileUrl) profileUrlInput.value = response.profileUrl;
            if (response.bio) contextBioInput.value = response.bio;
          }
        });
      }
    });
  };

  // Submit Generation Request
  generatorForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    generateSubmit.disabled = true;
    generateSubmit.innerHTML = '<div class="loading-spinner"></div><span>Drafting...</span>';
    outputsContainer.classList.add('hidden');
    variantsList.innerHTML = '';

    try {
      const response = await fetch(`${API_URL}/api/dm/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          profileUrl: profileUrlInput.value,
          outreachGoal: outreachGoalSelect.value,
          contextBio: contextBioInput.value
        })
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || 'Generation failed.');
      }

      const dms = resData.data?.generatedDMs || [];
      if (dms.length === 0) {
        throw new Error('No variations generated. Please verify parameters.');
      }

      // Render variants
      dms.forEach((variant, index) => {
        const div = document.createElement('div');
        div.className = 'variant-card';
        div.innerHTML = `
          <div class="variant-header">
            <span class="variant-title">${variant.title}</span>
            <span class="variant-score">${variant.score}%</span>
          </div>
          <div class="variant-text" id="text-${index}">${variant.text}</div>
          <div class="variant-actions">
            <button class="btn-secondary" id="copy-${index}">Copy</button>
            <button id="insert-${index}">Insert into Chat</button>
          </div>
        `;
        variantsList.appendChild(div);

        // Bind copy button
        document.getElementById(`copy-${index}`).addEventListener('click', () => {
          navigator.clipboard.writeText(variant.text);
          showSuccess('Copied to clipboard!');
        });

        // Bind insert button
        document.getElementById(`insert-${index}`).addEventListener('click', () => {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
              chrome.tabs.sendMessage(tabs[0].id, { action: 'insert', text: variant.text }, (insertRes) => {
                if (chrome.runtime.lastError) {
                  showError('Could not insert message. Please open a chatbox first.');
                  return;
                }
                if (insertRes && insertRes.success) {
                  showSuccess('Inserted message successfully!');
                } else {
                  showError(insertRes?.error || 'Active chat composer not found.');
                }
              });
            }
          });
        });
      });

      outputsContainer.classList.remove('hidden');
    } catch (err) {
      showError(err.message);
    } finally {
      generateSubmit.disabled = false;
      generateSubmit.textContent = 'Generate Messages';
    }
  });

  // Run initial check
  checkAuth();
});
