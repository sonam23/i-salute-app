const ActivityService = require('../services/activity.service');

// Create and Save a new activity
exports.create = (req, res) => {
    try {
        const activity = ActivityService.create(req.body);
        res.send(activity);
    } catch (e) {
        return res.status(500).send({
            message: e.message
        });
    }
};

// Retrieve and return all activities from the database.
exports.findAll = (req, res) => {
    try {
        const activity = ActivityService.findAll();
        res.send(activity);
    } catch (e) {
        return res.status(500).send({
            message: e.message
        });
    }
};

// Find a single Activity with a activityId
exports.findOne = (req, res) => {
    try {
        const activity = ActivityService.findOne(req.param);
        res.send(activity);
    } catch (e) {
        return res.status(500).send({
            message: e.message
        });
    }
};
