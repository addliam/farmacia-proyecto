const asyncHandler = require("express-async-handler")
const Category = require("../models/categoryModel")

const getCategories = asyncHandler(async (req,res) => {
    const categories = await Category.find()
    res.status(200).json(categories)
})

const createCategory = asyncHandler(async (req,res) => {
    if (!req.body.name || !req.body.description){
        res.status(400).send({error: "Fields name, description required"})    
    }
    else{
        const newCategory = await Category.create({
            name: req.body.name,
            description: req.body.description
        })
        res.status(201).json(newCategory)
    }
})

const updateCategory = asyncHandler(async (req,res) => {
    const category = await Category.findById(req.params.id)
    if (!category){
        res.status(400).json({error: "Category not found"})        
    }
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedCategory)
})

const deleteCategory = asyncHandler(async (req,res) => {
    const category = await Category.findById(req.params.id)
    if (!category){
        res.status(400).json({error: "Category not found"})        
    }    
    await Category.deleteOne({_id: req.params.id})
    res.status(200).json({id: req.params.id})

})

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}
