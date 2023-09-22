const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customersController');

router
    .route('/')
    .get(customersController.getAllCustomers)
    .post(customersController.createNewCustomers);

router
    .route('/:id')
    .get(customersController.getCustomersByID)
    .patch(customersController.patchCustomersByID)
    .delete(customersController.deleteCustomersByID);

module.exports = router;
