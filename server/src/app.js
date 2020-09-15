const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');

const app = express();

app.use(morgan('dev'));
app.use(cors('*'));
app.use(helmet());
app.use(express.json());

// GET /
app.get('/', (req, res) => {
  res.json({
    message: 'Hello world! 👋',
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
