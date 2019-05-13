const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./DB');

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(config.DB, { useNewUrlParser: true })
    .then(
	() => {console.log('Database is connected')}
    )
    .catch ((error) => {
	console.log('Can not connect to the database');
	console.lerror(error);
    });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

/* receive things as a json Object */
app.use(bodyParser.json());

app.post('/api/all-stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
	message: 'Thing created successfully!'
    });
});

app.use('/api/all-stuff', (req, res, next) => {

  const stuff = [
    {
      _id: 'oeihfzeoi',
      title: 'My first thing',
      description: 'All of the info about my first thing',
      imageUrl: 'https://commons.wikimedia.org/wiki/File:Canon_EOS_250D.png',
      price: 4900,
      userId: 'qsomihvqios',
    },

    {
      _id: 'oeihfzeomoihi',
      title: 'My second thing',
      description: 'All of the info about my second thing',
      imageUrl: 'https://commons.wikimedia.org/wiki/File:1xii79001.jpg',
      price: 3900,
      userId: 'qsomihvqios',
    },
  ];

  res.status(200).json(stuff);
    console.log('Exiting from use all-stuff');    
});

module.exports = app;
