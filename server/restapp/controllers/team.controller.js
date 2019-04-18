const TeamService = require('../services/team.service');

// Create and Save a new Team
exports.create = (req, res) => {
    try {
        const team = TeamService.create(req.body);
        res.send(team);
    } catch (e) {
        return res.status(500).send({
            message: e.message
        });
    }
};

// Retrieve and return all Teams from the database.
exports.findAll = (req, res) => {
    try {
        const team = TeamService.findAll();
        res.send(team);
    } catch (e) {
        return res.status(500).send({
            message: e.message
        });
    }
};

// Find a single Team with a teamId
exports.findOne = (req, res) => {
    try {
        const team = TeamService.findOne(req.param);
        res.send(team);
    } catch (e) {
        return res.status(500).send({
            message: e.message
        });
    }
};
