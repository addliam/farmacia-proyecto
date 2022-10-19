const express = require("express")
const router = express.Router()

// call controllers
const { getProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/productController")
const { check } = require('../controllers/checkController')

router.route('/check').get(check)

router.route('/').get(getProducts).post(createProduct)
router.route('/:id').put(updateProduct).delete(deleteProduct);

// export router 
module.exports = router
// then call it on main usin app.use('/api',route)