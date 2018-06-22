import mongoose from 'mongoose';

const ExerciseSchema= new mongoose.Schema({
    name: String,
    intensity : String ,
    met : Number ,
    timeTaken : Number ,

    video : {
        tutorial : String ,
        single : String ,
    }

});

export default mongoose.model('Exercise',  ExerciseSchema);
