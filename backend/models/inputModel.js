const mongoose = require('mongoose');
const inputSchema = mongoose.Schema(
    {
        batch: {
            product: {
                id : {
                    type: mongoose.Schema.Types.ObjectId
                },
                name: {
                    type: String
                }
            },
            number: {
                type: Number,
            },
        },
        quantity: {
            type: Number,
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Input',inputSchema)