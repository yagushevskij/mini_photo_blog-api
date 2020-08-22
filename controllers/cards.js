const Card = require('../models/card');
const { isUserExist } = require('../helpers.js');
const { cardNotFoundErr, ForbiddenErr } = require('../data.js');

const getCards = async (req, res, next) => {
  try {
    res.json(await Card.find({}).populate('owner'));
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const userExist = await isUserExist(owner);
    if (userExist) {
      const { name, link } = req.body;
      const result = await Card.create({ name, link, owner });
      res.json(result);
    } else {
      next(ForbiddenErr);
    }
  } catch (err) {
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const result = await Card.findById(req.params.cardId).populate('owner').orFail(cardNotFoundErr);
    if (JSON.stringify(req.user._id) === JSON.stringify(result.owner._id)) {
      result.remove(() => { res.json(result); });
    } else {
      next(ForbiddenErr);
    }
  } catch (err) {
    next(err);
  }
};

const addLike = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const userExist = await isUserExist(owner);
    if (userExist) {
      const result = await Card.findById(req.params.cardId).populate('owner').orFail(cardNotFoundErr);
      if (result.likes.includes(owner)) {
        res.json({ message: 'Можно только 1 маленький лайк' });
      } else {
        result.likes.push(owner);
        result.save();
        res.status(201).json(result);
      }
    } else {
      next(ForbiddenErr);
    }
  } catch (err) {
    next(err);
  }
};

const removeLike = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const userExist = await isUserExist(owner);
    if (userExist) {
      const result = await Card.findById(req.params.cardId).populate('owner').orFail(cardNotFoundErr);
      if (result.likes.includes(req.user._id)) {
        result.likes.splice(result.likes.indexOf(req.user._id), 1);
        result.save();
        res.json(result);
      } else {
        res.json({ message: 'В минус лайками не уйти(' });
      }
    } else {
      next(ForbiddenErr);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCards, createCard, deleteCard, addLike, removeLike,
};
