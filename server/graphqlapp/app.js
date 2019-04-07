const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConfig = require('.././config/database.config.js');

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to mlab database
//mongoose.connect('mongodb://admin:tester123@ds137550.mlab.com:37550/isalute', {useNewUrlParser: true })
mongoose.connect(dbConfig.url, {useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
