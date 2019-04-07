module.exports = (app) => {
    const team = require('../controllers/team.controller.js');
    const activity = require('../controllers/activity.controller.js');

    //TODO Create a new Team
    app.post('/teams', team.create);

    //Retrieve all teams :
    app.get('/teams', team.findAll);

    //TODO Retrieve a single Team with TeamId
    app.get('/teams/:teamId', team.findOne);

    app.post('/activity', activity.create);

    app.get('/activity', activity.findAll);
}
