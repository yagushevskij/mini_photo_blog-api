const Card = require('../models/card');
const NotFoundError = require('../classes/NotFoundError');
const ForbiddenError = require('../classes/ForbiddenError');
const { errMessages } = require('../config');

const getCards = async (req, res, next) => {
  try {
    res.json(await Card.find({}).populate('owner'));
  } catch (err) {
    next(err);
  }
};

const getCardsByUserId = async (req, res, next) => {
  try {
    res.json(await Card.find({ owner: req.params.userId }).populate('owner').orFail(new NotFoundError(errMessages.cardNotFound)));
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const result = await Card.create({ name, link, owner: req.user._id });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const result = await Card.findById(req.params.cardId).populate('owner').orFail(new NotFoundError(errMessages.cardNotFound));
    if ((result.owner) && JSON.stringify(req.user._id) === JSON.stringify(result.owner._id)) {
      result.remove(() => { res.json(result); });
    } else {
      next(new ForbiddenError(errMessages.forbidden));
    }
  } catch (err) {
    next(err);
  }
};

const addLike = async (req, res, next) => {
  try {
    const result = await Card.findById(req.params.cardId).populate('owner').orFail(new NotFoundError(errMessages.cardNotFound));
    if (result.likes.includes(req.user._id)) {
      res.status(200).json(result);
    } else {
      result.likes.push(req.user._id);
      result.save();
      res.status(201).json(result);
    }
  } catch (err) {
    next(err);
  }
};

const removeLike = async (req, res, next) => {
  try {
    const result = await Card.findById(req.params.cardId).populate('owner').orFail(new NotFoundError(errMessages.cardNotFound));
    if (result.likes.includes(req.user._id)) {
      result.likes.splice(result.likes.indexOf(req.user._id), 1);
      result.save();
      res.json(result);
    } else {
      res.json({ message: 'В минус лайками не уйти(' }); // Тут нужно вернуть объект с карточкой;
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCards, getCardsByUserId, createCard, deleteCard, addLike, removeLike,
};
