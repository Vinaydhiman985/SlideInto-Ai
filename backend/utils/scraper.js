const puppeteer = require('puppeteer');

// Helper to detect platform from URL
function detectPlatform(url) {
  const lowercaseUrl = url.toLowerCase();
  if (lowercaseUrl.includes('linkedin.com')) {
    return 'linkedin';
  } else if (lowercaseUrl.includes('twitter.com') || lowercaseUrl.includes('x.com')) {
    return 'twitter';
  } else if (lowercaseUrl.includes('github.com')) {
    return 'github';
  } else if (lowercaseUrl.includes('instagram.com')) {
    return 'instagram';
  }
  return 'email';
}

// Extract handle/username from URL
function extractUsername(url, platform) {
  try {
    const urlObj = new URL(url);
    const paths = urlObj.pathname.split('/').filter(Boolean);
    if (platform === 'linkedin' && paths.length >= 2 && paths[0] === 'in') {
      return paths[1];
    } else if (paths.length > 0) {
      return paths[paths.length - 1];
    }
  } catch (e) {
    // Fallback
  }
  return 'there';
}

async function scrapeProfile(profileUrl) {
  const platform = detectPlatform(profileUrl);
  const username = extractUsername(profileUrl, platform);
  
  // Return early if not a scrapable web URL
  if (platform === 'email') {
    return {
      name: 'User',
      username,
      bio: '',
      posts: [],
      platform,
      scrapingBlocked: true,
      message: 'Email outreach does not support web scraping'
    };
  }

  let browser;
  try {
    console.log(`Launching Puppeteer to scrape ${profileUrl} (${platform})...`);
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    // Set user agent to avoid basic headless blocks
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    // Set reasonable timeout
    await page.setDefaultNavigationTimeout(20000);

    await page.goto(profileUrl, { waitUntil: 'domcontentloaded' });

    const currentUrl = page.url();
    
    // Check for login wall redirects (common on LinkedIn / X)
    if (currentUrl.includes('login') || currentUrl.includes('authwall') || currentUrl.includes('signup')) {
      console.log(`Scraping blocked by login wall for ${platform} profile: ${profileUrl}`);
      await browser.close();
      return {
        name: username,
        username,
        bio: '',
        posts: [],
        platform,
        scrapingBlocked: true,
        message: 'Redirected to login wall'
      };
    }

    let scrapedData = {
      name: username,
      username,
      bio: '',
      posts: [],
      platform,
      scrapingBlocked: false
    };

    if (platform === 'github') {
      // Scrape GitHub Public profile
      scrapedData = await page.evaluate((uname) => {
        const nameEl = document.querySelector('span.p-name');
        const bioEl = document.querySelector('div.p-note');
        
        // Extract pinned repositories
        const pinnedItems = Array.from(document.querySelectorAll('.pinned-item-list-item-content'));
        const repos = pinnedItems.map(item => {
          const repoName = item.querySelector('span.repo')?.innerText?.trim() || '';
          const repoDesc = item.querySelector('.pinned-item-desc')?.innerText?.trim() || '';
          return repoName ? `${repoName}: ${repoDesc}` : '';
        }).filter(Boolean);

        return {
          name: nameEl?.innerText?.trim() || uname,
          username: uname,
          bio: bioEl?.innerText?.trim() || '',
          posts: repos.slice(0, 5), // Treat pinned repos as recent 'posts' or activities
          platform: 'github',
          scrapingBlocked: false
        };
      }, username);
    } else if (platform === 'linkedin') {
      // Try public LinkedIn scraping, though typically login walled
      scrapedData = await page.evaluate((uname) => {
        const nameEl = document.querySelector('h1.text-heading-xlarge') || document.querySelector('.top-card-layout__title');
        const bioEl = document.querySelector('.text-body-medium') || document.querySelector('.top-card-layout__headline');
        
        // Extract recent articles/activities if public
        const postEls = Array.from(document.querySelectorAll('.activity-card__title, .share-update-card__text'));
        const posts = postEls.map(el => el.innerText?.trim()).filter(Boolean);

        return {
          name: nameEl?.innerText?.trim() || uname,
          username: uname,
          bio: bioEl?.innerText?.trim() || '',
          posts: posts.slice(0, 5),
          platform: 'linkedin',
          scrapingBlocked: !nameEl
        };
      }, username);
    } else if (platform === 'twitter') {
      // Try public Twitter scraping
      scrapedData = await page.evaluate((uname) => {
        const nameEl = document.querySelector('[data-testid="User-Name"] span');
        const bioEl = document.querySelector('[data-testid="UserDescription"]');
        const tweetEls = Array.from(document.querySelectorAll('[data-testid="tweetText"]'));
        const tweets = tweetEls.map(el => el.innerText?.trim()).filter(Boolean);

        return {
          name: nameEl?.innerText?.trim() || uname,
          username: uname,
          bio: bioEl?.innerText?.trim() || '',
          posts: tweets.slice(0, 5),
          platform: 'twitter',
          scrapingBlocked: !nameEl
        };
      }, username);
    }

    await browser.close();
    
    // Capitalize first letter of name if it matches the username fallback
    if (scrapedData.name === username) {
      scrapedData.name = username.charAt(0).toUpperCase() + username.slice(1);
    }
    
    return scrapedData;

  } catch (err) {
    console.error(`Scraping error for URL ${profileUrl}:`, err.message);
    if (browser) {
      try { await browser.close(); } catch (e) {}
    }
    // Graceful fallback rather than throwing
    return {
      name: username.charAt(0).toUpperCase() + username.slice(1),
      username,
      bio: '',
      posts: [],
      platform,
      scrapingBlocked: true,
      message: err.message
    };
  }
}

module.exports = {
  scrapeProfile,
  detectPlatform
};
