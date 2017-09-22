"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const fs = require('fs');
const app = express();
require('dotenv').config();

app.set('view engine', 'pug');
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(compression());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.get('/', (req, res) => {
	res.render('index', {
		video: req.query.v ? `https://www.youtube.com/?v=${req.query.v}` : '',
	});
});
app.use('/download', require('./routes/'));
app.use('/api', require('./api/'));

app.listen(process.env.PORT || 8080, function() {
	console.log(`Server started at port ${process.env.PORT || 8080}`);
	clearFolder('./public/files');
});

const clearFolder = path => {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach((file, index) => {
			const curPath = path + "/" + file;
			if (fs.lstatSync(curPath).isDirectory()) {
				clearFolder(curPath);
			}
			else {
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
		createFolder(path);
	}
	else {
		createFolder(path);
	}
};

const createFolder = path => {
	fs.mkdirSync(path);
};
