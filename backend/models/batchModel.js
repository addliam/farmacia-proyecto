const mongoose = require('mongoose');
const batchSchema = mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId
        },
        stock: {
            type: Number,
        },
        number: {
            type: String,
        },
        caducation: {
            type: Date,
        },
        // month - day - year
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Batch',batchSchema)
// then import in controller