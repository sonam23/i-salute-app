const Team = require('../../models/team');

exists = teamId => {
    return !!Team.findOne(teamId);
};

// Create and save a new team
exports.create = query => {
    // Validate request
    if (!query.teamId) {
        throw Error('Team id cannot be empty!')
    }

    if (exists(query.teamId)) {
        throw Error('Team already exists with this id! Select another id.');
    }

    // Create a Team
    const team = new Team({
        teamId: query.teamId,
        email: query.email,
        description: query.description
    });

    // Save team in the database
    team.save()
        .then(data => {
            return data;
        }).catch(err => {
        throw Error(err.message || 'Error while saving the team');
    });
};

// Retrieve and return all teams from the database.
exports.findAll = () => {
    Team.find()
        .then(teams => {
            return teams;
        }).catch(err => {
        throw Error(err.message || 'Some error occurred while retrieving teams!');
    });
};

// Find a single team with a teamId
exports.findOne = query => {
    Team.findOne({teamId: query.teamId})
        .then(team => {
            if (!team) {
                throw Error('Team not found with id' + query.teamId);
            }
            return team;
        }).catch(err => {
            throw Error(err.message || 'Error retrieving team with id: ' + query.teamId);
    });
};
