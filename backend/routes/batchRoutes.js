const express = require("express")
const router = express.Router()

// call controllers
const { getBatchs, createBatch, updateBatch, deleteBatch } = require("../controllers/batchController")

router.route('/').get(getBatchs).post(createBatch)
router.route('/:id').put(updateBatch).delete(deleteBatch);

// export router 
module.exports = router
// then call it on main usin app.use('/api',route)