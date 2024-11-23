const express = require('express');
const { createUser } = require('../controller/userController');

const userRoute = express.Router();

userRoute.post('/user', createUser);

module.exports = userRoute;
