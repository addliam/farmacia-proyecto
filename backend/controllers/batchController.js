const asyncHandler = require("express-async-handler")
const Batch = require("../models/batchModel")
const Product = require("../models/productModel")

const getBatchs = asyncHandler(async (req,res) => {
    const batchs = await Batch.find()
    res.status(200).json(batchs)
})

const createBatch = asyncHandler(async (req,res) => {
    if (!req.body.productId || !req.body.stock || !req.body.caducation || !req.body.number){
        res.status(400).send({error: "Fields productId, stock, caducation required"})
    }else{
        const product = await Product.findById(req.body.productId)
        if (!product){
            res.status(400).send({error: "ProductId not found"})
        }else{
            const newBatch = await Batch.create({
                productId: req.body.productId,
                stock: req.body.stock,
                number: req.body.number,
                caducation: req.body.caducation
            })
            res.status(201).json(newBatch)
        }
    }
})

// pass id as param
const updateBatch = asyncHandler(async (req,res) => {
    const batch = await Batch.findById(req.params.id)
    if (!batch){
        res.status(400).json({error: "Batch not found"})        
    }
    // Todo check if not user
    const updatedBatch = await Batch.findByIdAndUpdate(req.params.id, req.body,{new: true})
    res.status(200).json(updatedBatch)
})

// pass id as param
const deleteBatch = asyncHandler(async (req,res) => {
    const batch = await Batch.findById(req.params.id)
    if (!batch){
        res.status(400)
        throw new Error("Batch not found")        
    }
    await Batch.deleteOne({id: req.params.id})
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getBatchs,
    createBatch,
    updateBatch,
    deleteBatch
}
// then go to routes to call controllers