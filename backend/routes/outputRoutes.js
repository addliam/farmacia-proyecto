const express = require("express")
const router = express.Router()

const { getOutputs, createOutput, updateOutput, deleteOutput } = require("../controllers/outputController")

router.route('/').get(getOutputs).post(createOutput)
router.route('/:id').put(updateOutput).delete(deleteOutput);

module.exports = router