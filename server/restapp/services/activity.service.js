const Activity = require('../../models/activity');
const UserService = require('../services/user.service');

const constants = require('../../lib/constants');

exists = activityId => {
    return !!Activity.findOne(activityId);
};

// Create and save a new activity
exports.create = query => {
    // Validate request
    if (!query.user_name && !query.text && !query.token === constants.SLACK_TOKEN) {
        return res.status(400).send({
            message: 'Invalid request!'
        });
    }

    let [user2, ...message] = unescape(query.text).split(' ', 3);
    const user1 = query.user_name;
    message = message.join(' ');

    // Do not allow users to recognise themselves
    if (user1 === user2) {
        throw Error("Naughty user! You can't vote yourself.");
    }

    // Increase user's score
    const user = UserService.findOneAndUpdate(user2);
    console.log("Updated user's score: " + user);

    // Create an activity
    const activity = new Activity({
        user1, user2, message
    });
    console.log('Created activity: ' + activity);

    // Save activity in the database
    activity.save()
        .then(data => {
            return data;
        }).catch(err => {
        throw Error(err.message || 'Some error occurred while saving the action.');
    });
};

// Retrieve and return all activities from the database.
exports.findAll = () => {
    Activity.find()
        .then(activities => {
            return activities;
        }).catch(err => {
        throw Error(err.message || 'Some error occurred while retrieving activities!');
    });
};

// Find a single activity with a activityId
exports.findOne = query => {
    Activity.findOne({activityId: query.activityId})
        .then(activity => {
            if (!activity) {
                throw Error('Activity not found with id' + query.activityId);
            }
            return activity;
        }).catch(err => {
        throw Error(err.message || 'Error retrieving activity with id: ' + query.activityId);
    });
};
