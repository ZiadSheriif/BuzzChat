import express from 'express';
const { body } = require('express-validator');
const userController = require('../controllers/users-controllers');

const router = express.Router();

router.post('/login', userController.login);
router.post('/signup', userController.signup);

module.exports = router;