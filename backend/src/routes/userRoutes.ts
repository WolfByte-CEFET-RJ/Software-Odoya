import express from 'express';
const router = express.Router();
const userController = require('../controllers/userController');

router
    .post('/user', userController.createUser)

export default router;