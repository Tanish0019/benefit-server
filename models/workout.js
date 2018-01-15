import mongoose from 'mongoose';

const WorkoutSchema = new mongoose.Schema({

    name: String,
    search_name : {
        type : String,
        unique : true
    },
    description : String ,
    sport : {
        type : String ,
        enum : ['Running' , 'Cycling' , 'Fitness' , 'Other']
    } ,
    routines : [{
        type : Schema.Types.ObjectId ,
        ref : 'Routine'
    }]
});

export default mongoose.model('Workout', WorkoutSchema);
