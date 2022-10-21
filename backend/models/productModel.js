const mongoose = require('mongoose');
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        category: {
            id: {
                type: mongoose.Schema.Types.ObjectId
            },
            name: {
                type: String
            },
        },
        description: {
            type: String
        },
        purchasePrice: {
            type: mongoose.Decimal128
        },
        stock: {
            type: Number,
            default: 0
        },
        active: {
            type: Boolean,
            default: true 
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Product',productSchema)
// then import in controller