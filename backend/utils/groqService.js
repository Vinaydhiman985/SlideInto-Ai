const Groq = require('groq-sdk');

let groq;
if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'gsk_placeholder_api_key_for_groq') {
  groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
} else {
  console.warn('Groq API Key is missing or placeholder. Running with mock fallbacks.');
}

async function generateDMVariants({ name, platform, outreachGoal, contextBio, bio, posts }) {
  if (!groq) {
    console.warn('Groq API Key is not set. Cannot call Groq SDK.');
    return null;
  }

  const postsText = posts && posts.length > 0
    ? posts.map((p, i) => `Post ${i + 1}: "${p}"`).join('\n')
    : 'No recent posts found.';

  const prompt = `
Generate exactly 3 cold outreach Direct Message (DM) templates for a prospect with the following details:
- Name: ${name}
- Target Platform: ${platform}
- Outreach Goal: ${outreachGoal}
- Prospect's Bio/Headline: ${bio || 'Not available'}
- Prospect's Recent Posts/Activities:
${postsText}
- Additional User Context: ${contextBio || 'None'}

Please tailor the generated DMs specifically to the platform's standard style:
- LinkedIn: Professional yet approachable, focus on career alignment, value-add, or mutual topics.
- Twitter/X: Casual, short, punchy, curiosity-inducing, witty, and low friction.
- GitHub: Focused on projects, code, contributions, collaboration, or engineering culture.
- Instagram: Creative, friendly, warm, using emojis appropriately.
- Email: Structured, professional, clear value proposition, with a soft CTA.

Return the result as a JSON object with the key "variants" containing an array of 3 elements.
Each element must contain:
1. "title": A descriptive name for this copy variation (e.g. "The Project Alignment Hook", "The Value-First Hook", etc.).
2. "text": The complete generated DM body.
3. "score": An integer from 1 to 100 representing the estimated conversion success score.
4. "metrics": An object with:
   - "hook": Short description of the hook type (e.g. "Direct", "Curiosity", "Soft", "Specific").
   - "length": String representing size ("Short", "Medium", "Long").
   - "cta": String representing the call to action style (e.g. "Soft", "Permission", "Direct").

Strictly return only JSON matching the schema:
{
  "variants": [
    {
      "title": "Variant Title",
      "text": "DM Text",
      "score": 90,
      "metrics": {
        "hook": "Specific",
        "length": "Short",
        "cta": "Soft"
      }
    }
  ]
}
`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are SlideInto AI, a world-class cold outreach copywriter. You write highly personalized, high-converting messages. You only reply with structured JSON data. Do not include any normal chat text, introductions, or markdown blocks like ```json.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' }
    });

    const content = chatCompletion.choices[0].message.content;
    const data = JSON.parse(content);
    
    if (data && Array.isArray(data.variants)) {
      return data.variants;
    }
    return null;
  } catch (err) {
    console.error('Error during Groq API generation:', err.message);
    return null;
  }
}

module.exports = {
  generateDMVariants
};
