const mongoose = require('mongoose');
const inputSchema = mongoose.Schema(
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

module.exports = mongoose.model('Input',inputSchema)