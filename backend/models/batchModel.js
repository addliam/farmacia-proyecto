const mongoose = require('mongoose');
const batchSchema = mongoose.Schema(
    {
        product: {
            id : {
                type: mongoose.Schema.Types.ObjectId
            },
            name: {
                type: String
            }
        },
        // gets modifies by inputs and outputs
        stock: {
            type: Number,
            default: 0
        },
        number: {
            type: Number,
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