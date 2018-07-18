import mongoose from 'mongoose';

const Tracking = new mongoose.Schema({
	distance: {
		type:Number,
		default: 0
	},
	time: Number,
	calories: {
		type: Number,
		default: 0
	},
	date: String,
	client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }
});

export default mongoose.model('Tracking', Tracking);
