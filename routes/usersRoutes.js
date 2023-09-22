const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');


router
    .route('/register')
    .get(usersController.register)
    .post(usersController.addUsersVerifier, usersController.addUsers);

router
    .route('/login')
    .get(usersController.userLoginPage)
    .post(usersController.onUserLoginAction);

router
    .route('/:id')
    .get(usersController.getUser);

router
    .route('/:id/update-info')
    .post(usersController.updateInfo);

router
    .route('/:id/update-password')
    .post(usersController.updatePassword);

module.exports = router;