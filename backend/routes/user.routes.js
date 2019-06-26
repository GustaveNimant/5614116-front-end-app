const express = require('express');
const userRoutes = express.Router();

const userCtrl = require('../controllers/userCtrl');

userRoutes.post('/signup', userCtrl.signup);
userRoutes.post('/login', userCtrl.login); /* get ? */

module.exports = userRoutes;
