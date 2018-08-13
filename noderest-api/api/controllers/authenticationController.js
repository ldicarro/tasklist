'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Task = mongoose.model('Tasks');
const config = require('../../config');


exports.check_token = (req, res, next) => {

	if(req.method === 'OPTIONS') { next(); }
	const appkey = req.headers['x-application-key'];

	if (!appkey) { return res.status(401).json({ message: 'Unauthorized' }); }
	if (appkey !== config.appkey) { return res.status(401).json({ message: 'Authorization failed' }); }
	if (appkey === config.appkey) { next(); }

};