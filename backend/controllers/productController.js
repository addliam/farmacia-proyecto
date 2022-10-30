const asyncHandler = require("express-async-handler")
const Product = require("../models/productModel")
const Category = require("../models/categoryModel")
const { default: mongoose } = require("mongoose")

const getProducts = asyncHandler(async (req,res) => {
    const products = await Product.find()
    res.status(200).json(products)
})

// @data name, categoryId, description, purchasePrice
const createProduct = asyncHandler(async (req,res) => {
    if (!req.body.name || !req.body.categoryId || !req.body.description || !req.body.purchasePrice){
        res.status(400).send({error: "Fields name, categoryId, description and purchasePrice required"})
    }else{
        // const categoryData = await Category.findById(req.body.categoryId)
        const categoryData = await Category.findByIdAndUpdate(req.body.categoryId,{$inc: {count: 1}})
        if (!categoryData){
            res.status(400).send({error: "CategoryId cannot be found"})
        }
        const newProduct = await Product.create({
            name: req.body.name,
            category: {
                id: req.body.categoryId,
                name: categoryData.name,
            },
            description: req.body.description,
            purchasePrice: req.body.purchasePrice
        })
        res.status(201).json(newProduct)
    }
})

// @param id
// @data name, categoryId, description, purchasePrice
const updateProduct = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)
    if (!product){
        res.status(400).json({error: "Product not found"})        
    }
    // Todo check if not user
    const categoryData = await Category.findById(req.body.categoryId)
    if (!categoryData){
        res.status(400).send({error: "CategoryId cannot be found"})
    }
    const newObject = {
        name: req.body.name,
        category: {
            id: req.body.categoryId,
            name: categoryData.name,
        },
        description: req.body.description,
        purchasePrice: req.body.purchasePrice
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, newObject,{new: true})
    res.status(200).json(updatedProduct)
})

// pass id as param
const deleteProduct = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)
    if (!product){
        res.status(400)
        throw new Error("Product not found")        
    }
    await Product.deleteOne({_id: req.params.id})
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}
// then go to routes to call controllers
