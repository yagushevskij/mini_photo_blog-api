const { addAsync } = require('@awaitjs/express');
const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});
const { login, createUser } = require('./controllers/users.js');
const { cards } = require('./routes/cards.js');
const { users } = require('./routes/users.js');
const authentication = require('./middlewares/authentication');
const authorization = require('./middlewares/authorization');
const { userValidationRules } = require('./middlewares/validation.js');
const errHandler = require('./middlewares/errHandler');

const { PORT = 3000 } = process.env;
const app = addAsync(express());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', [userValidationRules.password, userValidationRules.name, userValidationRules.about, userValidationRules.avatar, userValidationRules.email,
], createUser);

app.use(authentication);
app.use(authorization);

app.use('/cards', cards);
app.use('/users', users);

app.use(errHandler);

app.use((req, res) => {
  res.status('404').json({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
