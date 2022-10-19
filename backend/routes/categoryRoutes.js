const express = require("express")
const router = express.Router()

// call controllers
const { getCategories, createCategory, updateCategory, deleteCategory } = require("../controllers/categoryController")

router.route('/').get(getCategories).post(createCategory)
router.route('/:id').put(updateCategory).delete(deleteCategory);

// export router 
module.exports = router
// then call it on main usin app.use('/api',route)