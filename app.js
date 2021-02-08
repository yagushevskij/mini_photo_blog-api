require('dotenv').config();
const escape = require('escape-html');
const { addAsync } = require('@awaitjs/express');
const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const { celebrate, Joi } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});
const { login, createUser } = require('./controllers/users.js');
const { urlValidator, jwtValidator, celebrateErrorHandler } = require('./helpers.js');
const { cards } = require('./routes/cards.js');
const { users } = require('./routes/users.js');
const authentication = require('./middlewares/authentication');
const authorization = require('./middlewares/authorization');
const errHandler = require('./middlewares/errHandler');
const NotFoundError = require('./classes/NotFoundError');

const { PORT = 3001 } = process.env;
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

mongoose.connect('mongodb://localhost:27017/mestodb', {
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

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().trim()
      .min(2)
      .max(30)
      .custom(escape),
    about: Joi.string().trim().required().custom(escape),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    avatar: Joi.string().required().custom(urlValidator),
  }),
}), createUser);

app.use(celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().custom(jwtValidator),
  }).unknown(true),
}), authentication);
app.use(authorization);

app.use('/cards', cards);
app.use('/users', users);

app.use(errorLogger);

app.use(celebrateErrorHandler);
app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});
app.use(errHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
