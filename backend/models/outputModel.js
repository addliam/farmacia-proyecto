const mongoose = require('mongoose');
const outputSchema = mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId
        },
        stock: {
            type: Number,
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Output', outputSchema)