const express = require('express');
const router = express.Router();
const { body } = require('express-validator');


const bodyValidators = () => [
    body('name').exists().isString(),
    body('description').isString(),
    body('address').exists().isString(),
    body('city').exists().isString(),
    body('state').exists().isString(),
    body('country').exists().isString(),
    body('contact_no').exists().isString(),
    body('time_open').exists().matches('..:..'),
    body('time_close').exists().matches('..:..'),
    body('food_type').exists().matches('veg|non-veg|vegan').isString(),
    body('restaurant_type').exists().matches('delivery|pickup').isString(),
    body('media').optional({ nullable: true }).isArray(),
  ];
  

/**
 * Create a User
 * @route POST /users
 * @group Users
 * @security JWT
 * @param {User.model} User.body.require
 * @returns {User.model} 201 - Created User
 */
 router.post('/', ...bodyValidators(), resController.createRestaurant);
