const express = require('express');
const { getCartByUser, modifyProductTocart, clearCartById } = require('../controllers/cartController');
const { isLoggedIn } = require('../validation/authValidator');

const cartRouter = express.Router();
cartRouter.get('/', isLoggedIn, getCartByUser);
cartRouter.post('/:operation/:productId', isLoggedIn, modifyProductTocart);
cartRouter.delete('/products', isLoggedIn, clearCartById)

module.exports = cartRouter;