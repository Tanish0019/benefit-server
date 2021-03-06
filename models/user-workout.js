import mongoose, {Schema} from 'mongoose';

const UserWorkoutSchema = new mongoose.Schema({

    status : String,
    starttime : Date ,
    endtime : Date ,
    w_rating : String ,
    e_rating : String ,

    date : String ,
    client : {
        type : Schema.Types.ObjectId ,
        ref : 'Client'
    } ,
    workout : {
        type : Schema.Types.ObjectId ,
        ref : 'Workout'
    }
});

export default mongoose.model('UserWorkout', UserWorkoutSchema);
