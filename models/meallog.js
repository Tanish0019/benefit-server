import mongoose from 'mongoose';

const MealLogSchema = new mongoose.Schema({

    date: String,
    type: String,
    food: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FoodItem',
        }, quantity: Number
    }],
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }
});


export default mongoose.model('MealLog', MealLogSchema);
