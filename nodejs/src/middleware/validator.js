/* eslint-disable consistent-return */
const Joi = require('joi');
const UserSchema = require('../schemas/UserSchema');

module.exports = {
  registrationCredentials: async (req, res, next) => {
    const isExists = await UserSchema.findOne({ username: req.body.username });
    if (isExists) {
      return res.send({ error: true, message: 'User with that username already exists', data: null });
    }
    const schema = Joi.object({
      username: Joi.string().min(3).max(15).required(),
      passOne: Joi.string().min(5).max(20).required(),
      passTwo: Joi.string().min(5).max(20).required(),
      city: Joi.string().required(),
      gender: Joi.string().required(),
      age: Joi.number().min(18).max(99).required(),
    });
    try {
      const result = await schema.validateAsync(req.body, { abortEarly: false });
      if (result.passOne === result.passTwo) {
        next();
      } else {
        throw new Error('Bad credentials, try again');
      }
    } catch (error) {
      return res.send({ error: true, message: error.details[0].message });
    }
  },
  loginCredentials: async (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string().min(3).max(15).required(),
      password: Joi.string().min(5).max(20).required(),
    });
    try {
      const result = await schema.validateAsync(req.body, { abortEarly: false });
      if (result) {
        next();
      } else {
        throw new Error('Bad credentials, try again');
      }
    } catch (error) {
      return res.send({ error: true, message: error.details[0].message });
    }
  },
};
