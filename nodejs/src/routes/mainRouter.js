const express = require('express');
const { register, login } = require('../controller/mainController');
const { registrationCredentials, loginCredentials } = require('../middleware/validator');

const mainRouter = express.Router();

mainRouter.post('/register', registrationCredentials, register);
mainRouter.post('/login', loginCredentials, login);

module.exports = mainRouter;
