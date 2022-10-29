const asyncHandler = require("express-async-handler")
const Output  = require("../models/outputModel")
const Product = require("../models/productModel")

const getOutputs = asyncHandler(async (req,res) => {
    const outputsProduct = await Output.find()
    res.status(200).json(outputsProduct)
})

// call automaticaly when added batch 
// @data productId, stock
const createOutput = asyncHandler(async (req,res) => {
    if (!req.body.productId || !req.body.stock){
        res.status(400).send({error: "Fields productId and stock required"})
    }else{
        const product = await Product.findById(req.body.productId)
        if (!product){
            res.status(400).send({error: "ProductId not found"})
        }else{
            const newOutput = await Output.create({
                productId: req.body.productId,
                stock: req.body.stock
            })
            const stockQty = parseInt(req.body.stock)
            await Product.findByIdAndUpdate(req.body.productId,{$inc: {stock: -stockQty}})
            res.status(201).json(newOutput)
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