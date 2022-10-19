const express = require("express")
const router = express.Router()

const { getInputs, createInput, updateInput, deleteInput } = require("../controllers/inputController")

router.route('/').get(getInputs).post(createInput)
router.route('/:id').put(updateInput).delete(deleteInput);

module.exports = router