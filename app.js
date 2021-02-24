require('dotenv').config();
const { addAsync } = require('@awaitjs/express');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { isCelebrate } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');

const routes = require('./routes');
const errHandler = require('./middlewares/errHandler');
const NotFoundError = require('./classes/NotFoundError');
const { errMessages, sysMessages } = require('./config');
const { DB_CONN, PORT } = require('./config');

const app = addAsync(express());

const corsOptions = {
  origin: [
    'https://mesto.turbomegapro.ru',
    'http://localhost:8080',
    'https://yagushevskij.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Content-Type',
    'origin',
    'x-access-token',
    'authorization',
  ],
  credentials: true,
};

mongoose.connect(DB_CONN, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('*', cors(corsOptions));
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);

app.use((err, req, res, next) => {
  if (isCelebrate(err)) {
    const error = err.joi;
    error.statusCode = 400;
    return next(error);
  }
  return next(err);
});
app.use((req, res, next) => {
  next(new NotFoundError(errMessages.resourceNotFound));
});
app.use(errHandler);

app.listen(PORT, () => console.log(sysMessages.appListen));
