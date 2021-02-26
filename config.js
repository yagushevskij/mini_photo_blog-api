const projectUrl = process.env.NODE_ENV === 'production' ? 'https://mesto.turbomegapro.ru' : 'http://localhost:8080';
const apiUrl = process.env.NODE_ENV === 'production' ? 'https://mesto-api.turbomegapro.ru' : 'http://localhost:5500';
const fileFormats = {
  picture: {
    original: {
      formatName: 'original',
      formatPath: '/files/pictures/original/',
      quality: 100,
    },
    content: {
      formatName: 'content',
      formatPath: '/files/pictures/content/',
      width: 1080,
      quality: 80,
    },
    preview: {
      formatName: 'preview',
      formatPath: '/files/pictures/preview/',
      width: 480,
      quality: 80,
    },
  },
};
const pathToProject = __dirname;
const { JWT_SECRET = 'jwt-secret-key' } = process.env;
const { DB_CONN = 'mongodb://localhost:27017/mestodb' } = process.env;
const { PORT = 3001 } = process.env;
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
  JWT_SECRET,
  DB_CONN,
  PORT,
  errMessages,
  sysMessages,
  resultMessages,
  pathToProject,
  projectUrl,
  apiUrl,
  fileFormats,
};
