import mongoose from 'mongoose';

let ChatSchema = mongoose.Schema({
    created: Date,
    content: String,
    username: String,
    room: String
});

// create a model from the chat schema
export default mongoose.model('Chat', ChatSchema);
