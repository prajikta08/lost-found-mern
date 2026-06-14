const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    title: String,
    description: String,
    category: String,
    location: String,

    type: {
        type: String,
        enum: ["lost", "found"]
    },

    status: {
        type: String,
        enum: ["active", "resolved"],
        default: "active"
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    image: {
        type: String
    }
});

module.exports = mongoose.model("Item", itemSchema);