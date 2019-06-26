const thingModel = require('../models/thingModel');

exports.createThing = (req, res, next) => {
    // console.log('createThing req from form ', req);

    const thing = new thingModel({
	title: req.body.title,
	description: req.body.description,
	imageUrl: req.body.imageUrl,
	price: req.body.price,
	userId: req.body.userId
    });
    
    thing.save()
	.then(
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
};

exports.getOneThing = (req, res, next) => {
    // console.log('getOneThing req ', req);
    
    thingModel.findOne({
	_id: req.params.id
    })
	.then(
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
};

exports.modifyThing = (req, res, next) => {
    // console.log('modifyThing req from form ', req);

    const thing = new thingModel({
	_id: req.params.id, /* to keep the_id */
	title: req.body.title,
	description: req.body.description,
	imageUrl: req.body.imageUrl,
	price: req.body.price,
	userId: req.body.userId
    });

    thingModel.updateOne({_id: req.params.id}, thing)
	.then(
	    () => {
		res.status(201).json({
		    message: 'thingModel updated successfully!'
		});
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.deleteThing = (req, res, next) => {
    thingModel.deleteOne({_id: req.params.id})
	.then(
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
};

exports.getAllStuff = (req, res, next) => {
    thingModel.find()
	.then(
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
};

// module.exports = stuffCtrl.js;
