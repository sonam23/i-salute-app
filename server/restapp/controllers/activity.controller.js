const Activity = require('../../models/activity');

// Create and Save a new Activity
exports.create = (req, res) => {
    // Validate request
    if (!req.body.user1 && !req.body.user2) {
        return res.status(400).send({
            message: "User1 cannot be empty"
        });
    }

    // Create a Activity
    const activity = new Activity({
      user1: req.body.user1,
      user2: req.body.user2,
      action: req.body.action,
      message: req.body.message,
    });

    // Save Activity in the database
    activity.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};

// Retrieve and return all Activity from the database.
exports.findAll = (req, res) => {
    Activity.find()
        .then(activity => {
            res.send(activity);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Activity."
            });
        });
};
