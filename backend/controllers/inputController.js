const asyncHandler = require("express-async-handler")
const Input = require("../models/inputModel")
const Product = require("../models/productModel")
const Batch = require("../models/batchModel")

const getInputs = asyncHandler(async (req,res) => {
    const inputsProduct = await Input.find()
    res.status(200).json(inputsProduct)
})

// @data productId, batchNumber, quantity
// @data caducity

// @resp errorCode 0 - quantity is not positive numeric
// @resp errorCode 1 - productId was not found
// @resp errorCode 2 - batch not exists, so caducity required!

// @resp successCode 1 - created only input
// @resp successCode 2 - created batch and input
const createInput = asyncHandler(async (req,res) => {
    const num = Number(req.body.quantity)
    const qtyIsNumeric = Number.isInteger(num) && num > 0
    if (!req.body.productId || !req.body.batchNumber || !req.body.quantity){
        res.status(400).send({error: "Fields productId, batchNumber and quantity required"})
    }
    if(!qtyIsNumeric){
        res.status(400).send({error: "Quantity must be numeric", errorCode: 0})
    }
    else{
        const productData = await Product.findById(req.body.productId)
        const batchData = await Batch.findOne({'number':req.body.batchNumber, 'product.id': req.body.productId})
        if (!productData){
            res.status(400).json({error: "ProductId not found", errorCode: 1})
        }
        else{
            const productQtyAdded = await Product.findByIdAndUpdate(req.body.productId, {$inc: {stock: req.body.quantity}})
        }
        if (batchData){
            const newInput = {
                batch: {
                    product: {
                        id: productData._id,
                        name: productData.name,
                    },
                    number: batchData.number,
                },
                quantity: req.body.quantity,
            }
            const createdInput = await Input.create(newInput)
            const updatedBatchStock = await Batch.findByIdAndUpdate(batchData._id, {$inc: {stock: req.body.quantity}})
            res.status(201).json({sucessCode: 1, data: [createdInput, updatedBatchStock]})
        }
        else{
            if (!req.body.caducation){
                res.status(400).json({error: "Batch not exists. Caducation field is required", errorCode: 2})
            }else{
                const newBatch = {
                    product: {
                        id: productData._id,
                        name: productData.name,  
                    },
                    stock: req.body.quantity,
                    number: req.body.batchNumber,
                    caducation: req.body.caducation,
                }
                const createdBatch = await Batch.create(newBatch)
                const newInput = {
                    batch: {
                        product: {
                            id: productData._id,
                            name: productData.name,
                        },
                        number: createdBatch.number,
                    },
                    quantity: req.body.quantity,
                }
                const createdInput = await Input.create(newInput)
                res.status(201).json({sucessCode: 2, data: [createdBatch, createdInput]})
            }
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
    // TODO: Keep this in development, remove in production
    if (!req.params.id){
        res.status(400).json({error: "Id required as param"})
    }
    if (req.params.id === 'all'){
        res.status(400)
        const deleted = await Input.deleteMany({})
        res.status(201).json(deleted)
    }    
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