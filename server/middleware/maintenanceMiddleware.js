const GlobalConfig = require('../models/GlobalConfig');

// ??$$$ Enforce maintenance mode for specific structural operations
const checkMaintenance = async (req, res, next) => {
  const config = await GlobalConfig.findOne();
  
  // If maintenance mode is ON and user is NOT admin, block write operations
  if (config && config.maintenanceMode && req.user && req.user.role !== 'admin') {
    // Only block POST, PUT, DELETE for structural routes (Semesters/Subjects)
    const structuralRoutes = ['/api/v1/semesters', '/api/v1/subjects'];
    const isStructural = structuralRoutes.some(route => req.originalUrl.startsWith(route));
    
    if (isStructural && ['POST', 'PUT', 'DELETE'].includes(req.method)) {
      return res.status(403).json({
        success: false,
        message: 'System is in maintenance mode. Structural changes are temporarily disabled.'
      });
    }
  }
  
  next();
};

module.exports = checkMaintenance;
