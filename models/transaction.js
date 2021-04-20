// Imports.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create transaction schema.
const transactionSchema = new Schema(
{
    name:
    {
        type: String,
        trim: true,
        required: "Enter a name for transaction"
    },
    value:
    {
        type: Number,
        required: "Enter an amount"
    },
    date:
    {
        type: Date,
        default: Date.now
    }
});

// Compile schema into mongoose model.
const Transaction = mongoose.model("Transaction", transactionSchema);

// Export the model.
module.exports = Transaction;
