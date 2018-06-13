import mongoose from 'mongoose';
import mongooseSearchable from 'mongoose-searchable'

const FoodItemSchema = new mongoose.Schema({

    name : String ,
    calories : Number ,
    proteins : Number ,
    fats : Number ,
    carbs : Number ,
    fibre : Number ,
    sugar : Number ,
    unit : String ,
    size : {
        piece : Number ,
        bowl : Number ,
        katori : Number,
        serve : Number
    } ,
    query : String
});

FoodItemSchema.plugin(mongooseSearchable , {
    fields:['query','name'],
})

export default mongoose.model('FoodItem', FoodItemSchema);
