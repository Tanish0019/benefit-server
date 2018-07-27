import mongoose from 'mongoose';

let MessageSchema = mongoose.Schema({
    message: String,
    author: String,
    conversationId: {
    	type: mongoose.Schema.Types.ObjectId,
    	required: true
    }
},
{
	timestamps: true
});

// create a model from the chat schema
export default mongoose.model('MessageSchema', MessageSchema);
