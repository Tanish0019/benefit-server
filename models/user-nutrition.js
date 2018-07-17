import mongoose, {Schema} from 'mongoose';

const UserNutritionSchema = new mongoose.Schema({

    date : String ,
    type : Number ,
    client : {
        type : Schema.Types.ObjectId ,
        ref : 'Client'
    } ,
    nutrition : {
        type : Schema.Types.ObjectId ,
        ref : 'Nutrition'
    }
});

export default mongoose.model('UserNutrition', UserNutritionSchema);
