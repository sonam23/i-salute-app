const UserService = require('../services/user.service');

// Create and Save a new user
exports.create = (req, res) => {
    try {
        const user = UserService.create(req.body);
        res.send(user);
    } catch (e) {
        return res.status(500).send({
            message: e.message
        });
    }
};

// Retrieve and return all Users from the database.
exports.findAll = (req, res) => {
    UserService.findAll()
        .then(users => {
            res.send(users);
        }).catch(e => {
        res.status(500).send({
            message: e.message
        })
    })
};

// Find a single User with a userId
exports.findOne = (req, res) => {
    try {
        const user = UserService.findOne(req.param);
        res.send(user);
    } catch (e) {
        return res.status(500).send({
            message: e.message
        });
    }
};

exports.deleteOne = (req, res) => {
    try {
        const user = UserService.deleteOne(req.param);
        res.send(user);
    } catch (e) {
        return res.status(500).send({
            message: e.message
        });
    }
};
