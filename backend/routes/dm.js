const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const DM = require('../models/DM');
const { scrapeProfile, detectPlatform } = require('../utils/scraper');
const { generateDMVariants } = require('../utils/geminiService');

// Helper to generate mock DMs (Fallback when Groq fails or API key is not configured)
function generateMockDMs(platform, outreachGoal, contextBio, username) {
  const cText = contextBio ? ` regarding "${contextBio}"` : '';
  const greetings = {
    linkedin: `Hi ${username},`,
    twitter: `Hey ${username}!`,
    github: `Hello ${username},`,
    instagram: `Yo ${username}!`,
    email: `Dear ${username},`
  };
  const greeting = greetings[platform] || `Hey ${username},`;

  if (outreachGoal === 'job') {
    return [
      {
        title: "The Project Alignment Hook (Mock)",
        text: `${greeting}\n\nI’ve been following your work and was really impressed by the recent projects your team has shipped. I’m an engineer looking for new opportunities and would love to connect to learn more about the team culture and any potential openings you might have.\n\nI've attached some context on my background${cText}. Let me know if you have 5 minutes for a quick chat!\n\nBest,\nJohn`,
        score: 91,
        metrics: { hook: 'High', length: 'Short', cta: 'Soft' }
      },
      {
        title: "The Direct Reference Hook (Mock)",
        text: `${greeting}\n\nHope you are doing well. I noticed your team is working on some exciting features. I have experience in similar technologies and wanted to express interest in joining your team${cText}. Let me know if we can connect.\n\nThanks,\nJohn`,
        score: 84,
        metrics: { hook: 'Medium', length: 'Short', cta: 'Direct' }
      },
      {
        title: "The Value-Add Hook (Mock)",
        text: `${greeting}\n\nI saw your team's job posting and did a quick analysis of your tech stack. Here are a couple of improvements I could bring to the table${cText}. Would love to jump on a quick call to share them.\n\nBest regards,\nJohn`,
        score: 93,
        metrics: { hook: 'Excellent', length: 'Medium', cta: 'Curiosity' }
      }
    ];
  } else if (outreachGoal === 'collab') {
    return [
      {
        title: "The Value-First Approach (Mock)",
        text: `${greeting}\n\nI love what you're building. I’m currently working on SlideInto, an AI copywriter for cold outreach, and I see some really interesting overlap with what you're doing${cText}.\n\nWould you be open to a quick collaboration brainstorm? I can share a couple of co-marketing ideas I drafted for your team. Let me know if I can drop a quick Loom video here!\n\nBest,\nJohn`,
        score: 95,
        metrics: { hook: 'Excellent', length: 'Medium', cta: 'Curiosity' }
      },
      {
        title: "The Cross-Promo Suggestion (Mock)",
        text: `${greeting}\n\nHope this finds you well. I'm building a tool in a complementary space${cText} and see some great potential for cross-promotion to our audiences. Let me know if you'd be open to a brief chat to sync.\n\nCheers,\nJohn`,
        score: 87,
        metrics: { hook: 'Medium', length: 'Short', cta: 'Soft' }
      },
      {
        title: "The Quick Loom Pitch (Mock)",
        text: `${greeting}\n\nCame across your profile and thought our products would work great together. I recorded a 60-second video explaining why${cText}. Mind if I send the link?\n\nBest,\nJohn`,
        score: 90,
        metrics: { hook: 'High', length: 'Short', cta: 'Permission' }
      }
    ];
  } else {
    return [
      {
        title: "The Specific Advice Query (Mock)",
        text: `${greeting}\n\nI noticed your background in engineering leadership and had a quick question: how do you balance scale and velocity in early-stage engineering hires?\n\nI'm navigating this exact challenge right now${cText}. I'd highly value 10 minutes of your advice. Virtual coffee is on me!\n\nThanks,\nJohn`,
        score: 92,
        metrics: { hook: 'Specific', length: 'Short', cta: 'Soft' }
      },
      {
        title: "The Direct Playbook (Mock)",
        text: `${greeting}\n\nWe recently helped a SaaS team double their response rates using automated personalized DMs${cText}.\n\nWould you be open to looking at a 45-second demo of how this works? No sales pitch, just sharing what's working for others.\n\nBest,\nJohn`,
        score: 89,
        metrics: { hook: 'Observation', length: 'Medium', cta: 'Soft' }
      },
      {
        title: "The Permission CTA (Mock)",
        text: `${greeting}\n\nI'm building a platform to optimize cold messages${cText}. Since you have extensive experience, I'd value your quick feedback. Can I send a 30-second explanation link?\n\nBest,\nJohn`,
        score: 86,
        metrics: { hook: 'Low Friction', length: 'Short', cta: 'Permission' }
      }
    ];
  }
}

// @route   POST /api/dm/generate
// @desc    Generate direct message templates using Web Scraper + Groq AI
// @access  Private (JWT protected)
router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const { profileUrl, outreachGoal, contextBio } = req.body;

    if (!profileUrl) {
      return res.status(400).json({ message: 'Profile URL is required' });
    }
    if (!outreachGoal) {
      return res.status(400).json({ message: 'Outreach goal is required' });
    }

    const platform = detectPlatform(profileUrl);

    // 1. Run Puppeteer Scraper
    let profileData;
    try {
      profileData = await scrapeProfile(profileUrl);
    } catch (scrapeErr) {
      console.error('Error launching scraper, using fallback profile info:', scrapeErr.message);
      // Fallback profile details if scraper crashes completely
      profileData = {
        name: 'there',
        username: 'there',
        bio: '',
        posts: [],
        platform,
        scrapingBlocked: true
      };
    }

    // 2. Run Groq Generation
    let generatedDMs = null;
    let isMock = false;

    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
      try {
        generatedDMs = await generateDMVariants({
          name: profileData.name,
          platform: profileData.platform,
          outreachGoal,
          contextBio,
          bio: profileData.bio,
          posts: profileData.posts
        });
      } catch (geminiErr) {
        console.error('Gemini generation failed, falling back to mock templates:', geminiErr.message);
      }
    }

    // 3. Fallback to mock templates if Groq failed or key is missing
    if (!generatedDMs) {
      isMock = true;
      generatedDMs = generateMockDMs(
        profileData.platform,
        outreachGoal,
        contextBio,
        profileData.name
      );
    }

    // 4. Save to MongoDB
    const newDM = new DM({
      userId: req.user.id,
      profileUrl,
      platform: profileData.platform,
      outreachGoal,
      contextBio,
      generatedDMs
    });

    await newDM.save();

    res.status(201).json({
      message: isMock 
        ? 'DMs generated successfully (Fallback Mock Mode active due to missing/failed Gemini API call)' 
        : 'DMs generated successfully using Puppeteer + Gemini AI',
      scrapingBlocked: profileData.scrapingBlocked,
      scrapingDetails: {
        detectedName: profileData.name,
        scrapedBio: profileData.bio,
        postsScrapedCount: profileData.posts.length
      },
      data: newDM
    });
  } catch (err) {
    console.error('DM Generate error:', err);
    res.status(500).json({ message: 'Server error during generation' });
  }
});

// @route   GET /api/dm/history
// @desc    Retrieve saved DM history for the current user
// @access  Private (JWT protected)
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const dms = await DM.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json({ data: dms });
  } catch (err) {
    console.error('Fetch history error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
