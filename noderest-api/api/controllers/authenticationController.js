'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../../config');


exports.check_token = (req, res, next) => {

	if(req.method === 'OPTIONS') { 
		next(); 
	}
	else
	{
		const appkey = req.headers['x-application-key'];

		if (!appkey) { return res.status(401).json({ message: 'Unauthorized' }); }
		if (appkey !== config.appkey) { return res.status(401).json({ message: 'Authorization failed' }); }
		next();
	}

};