const { addAsync } = require('@awaitjs/express');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { login, createUser } = require('./controllers/users.js');
const { cards } = require('./routes/cards.js');
const { users } = require('./routes/users.js');
const auth = require('./middlewares/auth');
const errHandler = require('./middlewares/errHandler');

const { PORT = 3000 } = process.env;
const app = addAsync(express());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/cards', cards);
app.use('/users', users);

app.use(errHandler);

app.use((req, res) => {
  res.status('404').json({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
