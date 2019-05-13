const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./DB');

const app = express();

const Thing = require('./models/thing');

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

app.get('/api/all-stuff/:id', (req, res, next) => {
/* :id parametrized variable */
    Thing.findOne({
	_id: req.params.id
    }).then(
	(thing) => {
	    res.status(200).json(thing);
	}
    ).catch(
	(error) => {
	    res.status(404).json({
		error: error
	    });
	}
    );
});

app.put('/api/all-stuff/:id', (req, res, next) => {

    const thing = new Thing({ /* get fields from req */
	_id: req.params.id, /* to overwrite the _id */
	title: req.body.title,
	description: req.body.description,
	imageUrl: req.body.imageUrl,
	price: req.body.price,
	userId: req.body.userId
    });
    
    Thing.updateOne({_id: req.params.id}, thing).then(
	() => {
	    res.status(201).json({
		message: 'Thing updated successfully!'
	    });
	}
    ).catch(
	(error) => {
	    res.status(400).json({
		error: error
	    });
	}
    );
});

app.delete('/api/all-stuff/:id', (req, res, next) => {

    Thing.deleteOne({_id: req.params.id}).then(
	() => {
	    res.status(200).json({
		message: 'Deleted!'
	    });
	}
    ).catch(
	(error) => {
	    res.status(400).json({
		error: error
	    });
	}
    );
});

app.post('/api/all-stuff', (req, res, next) => {
    
    const thing = new Thing({ /* _id not needed */
	title: req.body.title,
	description: req.body.description,
	imageUrl: req.body.imageUrl,
	price: req.body.price,
	userId: req.body.userId
    });
    
    thing.save().then( /* a promise */
	() => {
	    res.status(201).json({
		message: 'Post saved successfully!'
	    });
	}
    ).catch(
	(error) => {
	    res.status(400).json({
		error: error
	    });
	}
    );
});

app.use('/api/all-stuff', (req, res, next) => {
  Thing.find().then( /* returns a promise */
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

module.exports = app;
