const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConfig = require('.././config/database.config.js');

mongoose.Promise = global.Promise;

const app = express();

// allow cross-origin requests
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./routes/isalute.routes.js')(app);

mongoose.connect(dbConfig.url, {useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('conneted to database');
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// bind express with graphql
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

app.listen(3000, () => {
    console.log('now listening for requests on port 3000');
});
