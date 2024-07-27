const asyncHandler = require("express-async-handler");
const Entry = require("../models/entryModel");
const Product = require("../models/productModel");
const Batch = require("../models/batchModel");

// Get all entries
const getEntries = asyncHandler(async (req, res) => {
    const entries = await Entry.find();
    res.status(200).json(entries);
});

// Create a new entry
// @data productId, batchNumber, quantity
// @data expiryDate
// @resp errorCode 0 - quantity is not a positive number
// @resp errorCode 1 - product ID not found
// @resp errorCode 2 - batch does not exist, expiry date required!
// @resp successCode 1 - entry created only
// @resp successCode 2 - batch created and entry
const createEntry = asyncHandler(async (req, res) => {
    const quantity = Number(req.body.quantity);
    const isQuantityNumeric = Number.isInteger(quantity) && quantity > 0;

    if (!req.body.productId || !req.body.batchNumber || !req.body.quantity) {
        return res.status(400).send({ error: "productId, batchNumber, quantity, and expiryDate (MM-DD-YYYY) are required" });
    }

    if (!isQuantityNumeric) {
        return res.status(400).json({ error: "Quantity must be a number", errorCode: 0 });
    }

    const productData = await Product.findById(req.body.productId);
    const batchData = await Batch.findOne({ batchNumber: req.body.batchNumber, productId: req.body.productId });

    if (!productData) {
        return res.status(400).json({ error: "Product ID not found", errorCode: 1 });
    }

    if (batchData) {
        const newEntry = {
            batch: {
                product: {
                    id: productData._id,
                    name: productData.name,
                },
                batchNumber: batchData.batchNumber,
            },
            quantity: req.body.quantity,
        };
        const createdEntry = await Entry.create(newEntry);
        await Batch.findByIdAndUpdate(batchData._id, { $inc: { stock: req.body.quantity } });
        return res.status(201).json({ successCode: 1, data: [createdEntry] });
    } else {
        if (!req.body.expiryDate) {
            return res.status(400).json({ error: "Batch does not exist. Expiry date is required", errorCode: 2 });
        }
        
        const newBatch = {
            product: {
                id: productData._id,
                name: productData.name,
            },
            stock: req.body.quantity,
            batchNumber: req.body.batchNumber,
            expiryDate: req.body.expiryDate,
        };
        const createdBatch = await Batch.create(newBatch);
        const newEntry = {
            batch: {
                product: {
                    id: productData._id,
                    name: productData.name,
                },
                batchNumber: createdBatch.batchNumber,
            },
            quantity: req.body.quantity,
        };
        const createdEntry = await Entry.create(newEntry);
        return res.status(201).json({ successCode: 2, data: [createdBatch, createdEntry] });
    }
});

// Update an entry
// Pass id as parameter
const updateEntry = asyncHandler(async (req, res) => {
    const entry = await Entry.findById(req.params.id);
    if (!entry) {
        return res.status(400).json({ error: "Entry not found" });
    }
    const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEntry);
});

// Delete an entry
// Pass id as parameter
const deleteEntry = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ error: "ID is required as a parameter" });
    }

    if (req.params.id === 'all') {
        // NOTE: Use this only for development, not for production
        const deleted = await Entry.deleteMany({});
        return res.status(201).json(deleted);
    }

    const entry = await Entry.findById(req.params.id);
    if (!entry) {
        return res.status(400).json({ error: "Entry not found" });
    }

    await Entry.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getEntries,
    createEntry,
    updateEntry,
    deleteEntry
};
