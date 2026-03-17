const dotenv = require('dotenv');

// ??$$$ Load environment variables and validate existence
dotenv.config();

const validateEnv = () => {
    const requiredEnv = ['MONGO_URI', 'JWT_SECRET'];
    const missingEnv = requiredEnv.filter(env => !process.env[env]);

    if (missingEnv.length > 0) {
        console.error(`Missing environment variables: ${missingEnv.join(', ')}`);
    }
    
    // ??$$$ Logic to gather all Gemini API keys for rotation
    const geminiKeys = [];
    let i = 1;
    while (process.env[`GEMINI_API_KEY_${i}`]) {
        geminiKeys.push(process.env[`GEMINI_API_KEY_${i}`]);
        i++;
    }
    // Fallback to single key if exists
    if (process.env.GEMINI_API_KEY && !geminiKeys.includes(process.env.GEMINI_API_KEY)) {
        geminiKeys.unshift(process.env.GEMINI_API_KEY);
    }
    
    return {
        port: process.env.PORT || 5000,
        mongoUri: process.env.MONGO_URI,
        jwtSecret: process.env.JWT_SECRET,
        redisUrl: process.env.REDIS_URL,
        geminiKeys: geminiKeys,
        nodeEnv: process.env.NODE_ENV || 'development'
    };
};

module.exports = validateEnv();
