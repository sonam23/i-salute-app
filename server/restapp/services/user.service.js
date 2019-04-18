const User = require('../../models/user');
const constants = require("../../lib/constants");

exports.exists = corpId => {
    return !!User.findOne(corpId);
};

// Create and save a new user
exports.create = query => {
    // Validate request
    if (!query.corpId) {
        throw Error('User id cannot be empty!')
    }

    if (exists(query.corpId)) {
        throw Error('User already exists with this corp id! Select another id.');
    }

    // Create a User
    const user = new User({
        name: query.nackCount,
        email: query.email,
        corpId: query.corpId,
        role: query.role,
        teamId: query.teamId,
        score: 0
    });

    // Save user in the database
    user.save()
        .then(data => {
            return data;
        }).catch(err => {
            throw Error(err.message || 'Error while saving the user');
    });
};

// Retrieve and return all users from the database.
exports.findAll = () => {
    User.find()
        .then(users => {
            console.log('users:', users);
            return users;
        }).catch(err => {
            throw Error(err.message || 'Some error occurred while retrieving users!');
    });
};

// Find a single user with a corpId
exports.findOne = query => {
    User.findOne({corpId: query.corpId})
        .then(user => {
            if (!user) {
                throw Error('Error retrieving user with id: ' + query.corpId);
            }
            return user;
        }).catch(err => {
            throw Error(err.message || 'Error while retrieving user with id: ' + query.corpId);
    });
};

exports.deleteOne = query => {
    User.deleteOne({corpId: query.corpId})
        .then(user => {
            if (!user) {
                throw Error('Error deleting user with id: ' + query.corpId);
            }
            return user;
        }).catch(err => {
        throw Error(err.message || 'Error while deleting user with id: ' + query.corpId);
    });
};

exports.findOneAndUpdate = query => {
    User.findOneAndUpdate({corpId: query.corpId}, {inc: {score: constants.SCORE_INCREMENT}})
        .then(user => {
            console.log("i'm here", user);
            if (!user) {
                throw Error("Error while updating user's score. Check if the user exists.");
            }
            return user;
        }).catch(err => {
            throw Error(err.message || "Error while updating user's score!");
    });
}
