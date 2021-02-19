const { JWT_SECRET = 'jwt-secret-key' } = process.env;
const { DB_CONN = 'mongodb://localhost:27017/mestodb' } = process.env;
const { PORT = 3001 } = process.env;
const pathToProject = __dirname;
const errMessages = {
  resourceNotFound: 'Запрашиваемый ресурс не найден',
  cardNotFound: 'Карточка не найдена',
  forbidden: 'Действие запрещено',
  userNotFound: 'Пользователь не найден',
  wrongAuthData: 'Неверный логин или пароль',
  serverError: 'На сервере произошла ошибка',
  authorizationRequired: 'Необходима авторизация',
  urlInvalid: 'Введен невалидный URL',
  fieldRequired: 'Обязательное поле',
};
const sysMessages = {
  appListen: `App listening on port ${PORT}`,
};
const resultMessages = {
  logout: 'Выполнен logout',
};
module.exports = {
  JWT_SECRET, DB_CONN, PORT, errMessages, sysMessages, resultMessages, pathToProject,
};
