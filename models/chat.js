import mongoose from 'mongoose';

let ChatSchema = mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    message: String,
    author: Number,
    room: {
        index : true ,
        type : String
    }
});

// create a model from the chat schema
export default mongoose.model('Chat', ChatSchema);
