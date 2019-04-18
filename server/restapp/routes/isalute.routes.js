module.exports = (app) => {
    const team = require('../controllers/team.controller');
    const activity = require('../controllers/activity.controller');
    const user = require('../controllers/user.controller');

    // Team endpoints
    app.get('/teams', team.findAll);
    app.get('/teams/:teamId', team.findOne);

    // User endpoints
    app.get('/users', user.findAll);
    app.get('/users/:userId', user.findOne);
    app.post('/user', user.create);
    app.post('/user/delete', user.deleteOne);

    // Activity endpoints
    app.get('/activity', activity.findAll);
    app.post('/activity', activity.create);
};
