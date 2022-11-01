const asyncHandler = require("express-async-handler")
const Output  = require("../models/outputModel")
const Product = require("../models/productModel")
const Batch = require("../models/batchModel")

const getOutputs = asyncHandler(async (req,res) => {
    const outputsProduct = await Output.find()
    res.status(200).json(outputsProduct)
})

// @data batchId, quantity

// @resp errorCode 0 - quantity is not positive numeric
// @resp errorCode 1 - batch not exists
// @resp errorCode 2 - Quantity cannot be less than actual batch stock, returns batchStock

// @resp successCode 1 - created only output
const createOutput = asyncHandler(async (req,res) => {
    const num = Number(req.body.quantity)
    const qtyIsNumeric = Number.isInteger(num) && num > 0
    if (!req.body.batchId || !req.body.quantity){
        res.status(400).json({error: "Fields batchId and quantity required"})
    }
    if(!qtyIsNumeric){
        res.status(400).json({error: "Quantity must be numeric", errorCode: 0})
    }
    else{
        const batchData = await Batch.findById(req.body.batchId)
        if (!batchData){
            res.status(400).json({error: "Batch not found", errorCode: 1})
        }
        else{
            if (batchData.stock < num){
                res.status(400).json({error: "Quantity can not be less than actual batch stock", errorCode: 2, batchStock: batchData.stock})
            }
            else{
                const productQtyDecreased = await Product.findByIdAndUpdate(batchData.product.id, {$inc: {stock: -num}})
                const updatedBatchStock = await Batch.findByIdAndUpdate(batchData._id, {$inc: {stock: -num}})
                const newOutput = {
                    batch: {
                        product: {
                            id: batchData.product.id,
                            name: batchData.product.name,
                        },
                        number: batchData.number,
                    },
                    quantity: num
                }
                const createdOutput = await Output.create(newOutput)
                res.status(201).json({sucessCode: 1, data: [createdOutput, updatedBatchStock]})
            }
        }
    }
})

// pass id as param
const updateOutput = asyncHandler(async (req,res) => {
    const output = await Output.findById(req.params.id)
    if (!output){
        res.status(400).json({error: "Output product not found"})        
    }
    // Todo check if not user
    const updatedOutput = await Output.findByIdAndUpdate(req.params.id, req.body,{new: true})
    res.status(200).json(updatedOutput)
})

// pass id as param
const deleteOutput = asyncHandler(async (req,res) => {
    const output = await Output.findById(req.params.id)
    if (!output){
        res.status(400).json({error: "Output product not found"})        
    }
    await Input.deleteOne({_id: req.params.id})
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getOutputs,
    createOutput,
    updateOutput,
    deleteOutput
}