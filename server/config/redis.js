const Redis = require('ioredis');

// ??$$$ Redis Client setup for caching and rate limiting
const connectRedis = () => {
    try {
        const redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
            maxRetriesPerRequest: 1,
            retryStrategy(times) {
                if (times > 3) return null;
                return 5000;
            }
        });
        
        redis.on('connect', () => {
            console.log('Redis Connected');
        });

        redis.on('error', (err) => {
            // Quiet mode for local development without Redis
            if (err.code === 'ECONNREFUSED') {
                // Log once and move on
                if (!redis._loggedWarning) {
                    console.warn('??$$$ Redis (Cache) offline. System acting in direct-DB mode.');
                    redis._loggedWarning = true;
                }
            } else {
                console.warn('Redis Connection Error:', err.message);
            }
        });

        return redis;
    } catch (error) {
        return null;
    }
};

const redis = connectRedis();

module.exports = redis;
