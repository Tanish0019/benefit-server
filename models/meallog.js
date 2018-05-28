import mongoose from 'mongoose';

const MealLogSchema = new mongoose.Schema({

    date: String,
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    time : {
        type : String ,
    },
    items : [{
        name : String ,
        id : String ,
        quantity : Number
    }] ,
    total : {
        protein : Number ,
        carbs : Number ,
        fat : Number ,
        calories : Number
    }
});


export default mongoose.model('MealLog', MealLogSchema);
