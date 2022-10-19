const mongoose = require('mongoose');
const modelSchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        description: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Category',modelSchema)
// then import in controller