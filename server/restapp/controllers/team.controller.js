const Team = require('../../models/team');

// Create and Save a new Team
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nameId) {
        return res.status(400).send({
            message: "Team nameId can not be empty"
        });
    }

    // Create a Team
    const team = new Team({
      nameId: req.body.nameId,
      email: req.body.email,
      description: req.body.description
    });

    // Save Note in the database
    team.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });

};

// Retrieve and return all Teams from the database.
exports.findAll = (req, res) => {
    Team.find()
        .then(teams => {
            res.send(teams);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Teams."
            });
        });
};

// Find a single Team with a teamId
exports.findOne = (req, res) => {
  console.log("REQ = "+req.params.teamId)
  Team.findOne({teamId: req.params.teamId})
     .then(team => {
         if(!team) {
             return res.status(404).send({
                 message: "Team not found with id " + req.params.teamId
             });
         }
         res.send(team);
     }).catch(err => {
         if(err.kind === 'ObjectId') {
             return res.status(404).send({
                 message: "Team not found with id " + req.params.teamId
             });
         }
         return res.status(500).send({
             message: "Error retrieving team with id " + req.params.teamId
         });
     });
};
