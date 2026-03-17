const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');

// Route files
const authRoutes = require('./routes/authRoutes');
const semesterRoutes = require('./routes/semesterRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const marksRoutes = require('./routes/marksRoutes');
const predictionRoutes = require('./routes/predictionRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const eventRoutes = require('./routes/eventRoutes');
const configRoutes = require('./routes/configRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

/**
 * ??$$$ Express application setup (middleware, routes)
 */

// Body parser
app.use(express.json());

// Security Middlewares
app.use(helmet());
app.use(cors({
    origin: function (origin, callback) {
        // Allow all origins
        callback(null, origin || true);
    },
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Mount routers
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/semesters', semesterRoutes);
app.use('/api/v1/subjects', subjectRoutes);
app.use('/api/v1/marks', marksRoutes);
app.use('/api/v1/calculations', predictionRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/config', configRoutes);
app.use('/api/v1/ai', aiRoutes);

// Error Handler
app.use(errorHandler);

module.exports = app;
