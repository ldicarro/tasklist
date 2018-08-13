const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Task = require('./api/models/todoListModel');
const bodyParser = require('body-parser');

const config = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useNewUrlParser: true });

app.use((req,res,next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Application-Key');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use((req,res) => { res.status(404).send({url: req.originalUrl + ' not found'}); });

var routes = require('./api/routes/todoListRoutes');
routes(app);

app.listen(port);

console.log(`todo list server started on: ${port}` )