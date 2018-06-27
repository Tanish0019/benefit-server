import mongoose from 'mongoose';

const ExerciseSchema= new mongoose.Schema({
    sno : Number,
    name: String,
    intensity : String ,
    mets : Number ,
    timeTaken : Number ,
    base : String ,
    repFormat : String ,
    type : String ,
    videoA : Boolean ,
    videoB : Boolean ,

});

export default mongoose.model('Exercise',  ExerciseSchema);
