const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db_config = require('./models/db_config');

const userRoutes  = require('./routes/user.routes');
const stuffRoutes = require('./routes/stuff.routes');

const app = express();

mongoose.Promise = global.Promise;

app.use((req, res, next) => { /* no route : applies to all incoming requests */
    // 26 Juin 2019    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Origin', '*' always); /* always ajout 26 Juin 2019 */
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json()); /* receive things as a json Object */

app.use('/api/auth', userRoutes); /* user route to /api/auth/login /api/auth/signup */
app.use('/api/all-stuff', stuffRoutes); /* main route */

mongoose.connect(db_config.DB_URI, { useNewUrlParser: true }) /* asked when launching nodemon */
    .then( /* Promise */
	() => {console.log('Database is connected to Uri', db_config.DB_URI)}
    )
    .catch ((error) => {
	console.log('Can not connect to the database');
	console.error(error);
    });

module.exports = app;
