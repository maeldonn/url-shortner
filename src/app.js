const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

require('dotenv').config();

const middlewares = require('./middlewares');
const urls = require('./urls/urls.routes');

const app = express();

app.enable('trust proxy');

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.static('./public'));

app.use(urls);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
