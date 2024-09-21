import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    borrowedBooks: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Book'
    }],
    penaltyEndDate: { type: Date }
});

const Member = mongoose.model('Member', memberSchema);
export default Member;