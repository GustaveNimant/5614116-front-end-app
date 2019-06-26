const jwt = require('jsonwebtoken');

const authentification =
    (req, res, next) => { /* lambda function */
    // console.log('Entering in authentification with req ', req);
    try {
	const authHeader = req.headers.authorization;
	const token = authHeader.split(' ')[1];
	console.log('In authorization : JWT token >',token,'<');
	const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
	const userId = decodedToken.userId;
	if (req.body.userId && req.body.userId !== userId) {
	    throw 'In auth.js exports : Invalid user ID';
	} else {/* everything is ok */
	    // console.log('In authentification : going to next()');
	    next();
	}
    } catch {
	// console.log('In authentification Error 401');
	res.status(401).json({
	    error: new Error('Error in authentification : Invalid request!')
	});
    }
};

module.exports = authentification;
