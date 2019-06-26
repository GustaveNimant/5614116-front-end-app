const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    
    bcrypt.hash(req.body.password, 10)
	.then(
	    (password_hash) => {
		console.log('SIGNUP req.body.password is', req.body.password);
		console.log('SIGNUP password_hash                 is', password_hash);
		console.log('SIGNUP password_hash                           1234567890123456789012');
		const salt = bcrypt.genSalt(10, function(err, a_salt) {
		    console.log('SIGNUP salt is', a_salt);
		});
		const user = new userModel({
		    email: req.body.email,
		    password: password_hash
		});
		
		user.save()
		    .then(
			() => {
			    res.status(201).json({
				message: 'User added successfully!'
			    });
			})
		    .catch(
			(error) => {
			    console.log('SIGNUP Error at signup password_hash is',password_hash);
			    res.status(500).json({
				error: error
			    });
			});
	    }
	);
};

exports.login = (req, res, next) => {
    /* look at database if user with that email exists */
    userModel.findOne({ email: req.body.email }).then(
	(user) => {
	    if (!user) {
		return res.status(401).json({
		    error: new Error('login : User not found!')
		});
	    }
	    console.log('LOGIN user email', email,' user.password_hash is ', user.password_hash);
	    bcrypt.compare(req.body.password, user.password_hash)
		.then(
		    (valid) => {
			if (!valid) {
			    return res.status(401).json({
				error: new Error('login : Incorrect password!')
			    });
			}
			console.log('LOGIN req.body.password is ', req.body.password);
			console.log('LOGIN user.password_hash is ', user.password_hash);
			
			const token = jwt.sign(
			    { userId: user._id },
			    //{ userPassword : 'truc'},
				      { userPassword : user.password_hash },
				      { expiresIn: '24h' });
				  console.log('LOGIN token is', token);
				  res.status(200).json({
				      userId: user._id,
				      token: token
				  });
			      } 
			  ).catch(
			      (err) => {
				  console.log('LOGIN Error password_hash is',user.password_hash);
				  res.status(500).json({
				      error: err
				  });
			      }
			  );
	}
    ).catch(
	(error) => {
	    res.status(500).json({
		error: error
	    });
	}
    );
};
