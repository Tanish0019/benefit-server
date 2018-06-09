import mongoose from 'mongoose';

const FoodItemSchema = new mongoose.Schema({

    status : String,
    starttime : Date ,
    endtime : Date ,
    w_rating : String ,
    e_rating : String ,
    comp_routines : Number ,
    workout : {
        type : Schema.Types.ObjectId ,
        ref : 'Workout'
    }
});

export default mongoose.model('UserWorkout', FoodItemSchema);
