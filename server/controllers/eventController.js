const Event = require('../models/Event');

exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ userId: req.user.id });
    res.status(200).json({ success: true, count: events.length, data: events });
  } catch (error) {
    next(error);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    let event = await Event.findById(req.params.id);
    if (!event || event.userId.toString() !== req.user.id) {
       return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event || event.userId.toString() !== req.user.id) {
       return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    await event.deleteOne();
    res.status(200).json({ success: true, message: 'Event removed' });
  } catch (error) {
    next(error);
  }
};
