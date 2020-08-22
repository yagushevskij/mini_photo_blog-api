const cardNotFoundErr = new Error('Карточка не найдена');
cardNotFoundErr.name = 'NotFound';
const ForbiddenErr = new Error('Действие запрещено');
ForbiddenErr.name = 'Forbidden';
const userNotFoundErr = new Error('Пользователь не найден');
userNotFoundErr.name = 'NotFound';
const wrongAuthErr = new Error('Неверный логин или пароль');
wrongAuthErr.name = 'Unauthorized';
const authRequiredErr = new Error('Необходима авторизация');
authRequiredErr.name = 'Unauthorized';
const validationErr = new Error();
validationErr.name = 'ValidationError';

module.exports = {
  userNotFoundErr, cardNotFoundErr, ForbiddenErr, wrongAuthErr, authRequiredErr, validationErr,
};
