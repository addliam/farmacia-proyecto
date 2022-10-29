const asyncHandler = require("express-async-handler")
const Input = require("../models/inputModel")
const Product = require("../models/productModel")

const getInputs = asyncHandler(async (req,res) => {
    const inputsProduct = await Input.find()
    res.status(200).json(inputsProduct)
})

// call automaticaly when added batch 
// @data productId, stock
const createInput = asyncHandler(async (req,res) => {
    if (!req.body.productId || !req.body.stock){
        res.status(400).send({error: "Fields productId and stock required"})
    }else{
        const product = await Product.findById(req.body.productId)
        if (!product){
            res.status(400).send({error: "ProductId not found"})
        }else{
            const newInput = await Input.create({
                productId: req.body.productId,
                stock: req.body.stock
            })
            await Product.findByIdAndUpdate(req.body.productId,{$inc: {stock: req.body.stock}})
            res.status(201).json(newInput)
        }
    }
})

// pass id as param
const updateInput = asyncHandler(async (req,res) => {
    const input = await Input.findById(req.params.id)
    if (!input){
        res.status(400).json({error: "Input product not found"})        
    }
    // Todo check if not user
    const updatedInput = await Input.findByIdAndUpdate(req.params.id, req.body,{new: true})
    res.status(200).json(updatedInput)
})

// pass id as param
const deleteInput = asyncHandler(async (req,res) => {
    const input = await Input.findById(req.params.id)
    if (!input){
        res.status(400)
        throw new Error("Input product not found")        
    }
    await Input.deleteOne({_id: req.params.id})
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getInputs,
    createInput,
    updateInput,
    deleteInput
}