import mongoose , {Schema} from 'mongoose';

const NutritionSchema = new mongoose.Schema({

    name: String,
    search_name: {
        type: String,
        unique: true
    },
    description: String,
    foods: [{
        food: {
            type: Schema.Types.ObjectId,
            ref: 'FoodItem'
        } ,
        quantity : Number ,
        unit : String
    }]
});

export default mongoose.model('Nutrition', NutritionSchema);
