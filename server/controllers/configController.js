const GlobalConfig = require('../models/GlobalConfig');

exports.getConfig = async (req, res, next) => {
  try {
    let config = await GlobalConfig.findOne();
    if (!config) {
      // Create default if not exists
      config = await GlobalConfig.create({ maintenanceMode: false, updatedBy: req.user.id });
    }
    res.status(200).json({ success: true, data: config });
  } catch (error) {
    next(error);
  }
};

exports.updateMaintenanceMode = async (req, res, next) => {
  try {
    const { maintenanceMode } = req.body;
    let config = await GlobalConfig.findOne();
    
    if (!config) {
      config = await GlobalConfig.create({ maintenanceMode, updatedBy: req.user.id });
    } else {
      config.maintenanceMode = maintenanceMode;
      config.updatedBy = req.user.id;
      await config.save();
    }

    res.status(200).json({ success: true, data: config });
  } catch (error) {
    next(error);
  }
};
