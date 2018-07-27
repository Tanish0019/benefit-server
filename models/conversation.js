import mongoose from 'mongoose';

let ConversationSchema = mongoose.Schema({
    participants: [{ 
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'Client'
    }]
});

// create a model from the chat schema
export default mongoose.model('Conversation', ConversationSchema);
