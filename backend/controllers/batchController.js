const asyncHandler = require("express-async-handler")
const Batch = require("../models/batchModel")
const Product = require("../models/productModel")

const getBatchs = asyncHandler(async (req,res) => {
    const batchs = await Batch.find()
    res.status(200).json(batchs)
})

// @data productId, number, caducation
const createBatch = asyncHandler(async (req,res) => {
    if (!req.body.productId || !req.body.caducation || !req.body.number){
        res.status(400).send({error: "Fields productId, number and caducation required"})
    }else{
        const productData = await Product.findById(req.body.productId)
        if (!productData){
            res.status(400).send({error: "ProductId not found"})
        }else{
            const newBatch = await Batch.create({
                product: {
                    id: productData._id,
                    name: productData.name,
                },
                stock: 0,
                number: req.body.number,
                caducation: req.body.caducation
            })
            res.status(201).json(newBatch)
        }
    }
})

// pass id as param
// @data productId, number, caducation
const updateBatch = asyncHandler(async (req,res) => {
    const batchData = await Batch.findById(req.params.id)
    if (!batchData){
        res.status(400).json({error: "Batch not found"})        
    }
    // Todo check if not user
    // Todo check id data params are complete
    const updatedBatch = await Batch.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedBatch)
})

// pass id as param
const deleteBatch = asyncHandler(async (req,res) => {
    const batch = await Batch.findById(req.params.id)
    if (!batch){
        res.status(400)
        throw new Error("Batch not found")        
    }
    await Batch.deleteOne({_id: req.params.id})
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getBatchs,
    createBatch,
    updateBatch,
    deleteBatch
}
// then go to routes to call controllers