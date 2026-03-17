const { GoogleGenerativeAI } = require('@google/generative-ai');
const env = require('../config/env');

let currentKeyIndex = 0;

// ??$$$ Helper to get the next Gemini API key in the cycle
const getNextGeminiKey = () => {
    if (env.geminiKeys.length === 0) return null;
    const key = env.geminiKeys[currentKeyIndex];
    currentKeyIndex = (currentKeyIndex + 1) % env.geminiKeys.length;
    return key;
};

// @desc    Send a natural language query to Gemini AI
// @route   POST /api/v1/ai/query
exports.aiQuery = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    const apiKey = getNextGeminiKey();

    if (!apiKey) {
        return res.status(200).json({ 
            success: true, 
            data: { response: "AI Co-Pilot is currently offline (Gemini API keys missing). Please score well anyway!" } 
        });
    }

    // ??$$$ Initialize Gemini API
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    res.status(200).json({
      success: true,
      data: { response: responseText }
    });
  } catch (error) {
    console.error('Gemini AI Error:', error);
    
    // If one key fails, it might be rate limited, the next call will use the next key in the cycle
    res.status(500).json({ 
        success: false, 
        message: 'Could not process AI query via Gemini. Please try again to trigger next key in cycle.' 
    });
  }
};
