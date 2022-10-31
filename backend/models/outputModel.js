const mongoose = require('mongoose');
const outputSchema = mongoose.Schema(
    {
        product: {
            id : {
                type: mongoose.Schema.Types.ObjectId
            },
            name: {
                type: String
            }
        },
        batch: {
            id: {
                type: mongoose.Schema.Types.ObjectId
            }
        },
        quantity: {
            type: Number,
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Output', outputSchema)