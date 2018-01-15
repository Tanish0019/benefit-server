import mongoose from 'mongoose';
import * as autoIncrement from "mongoose-auto-increment";

const WorkoutSchema = new mongoose.Schema({

    name: String,
    search_name : String,
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


ClientSchema.plugin(autoIncrement.plugin, {
    model: 'Client',
    field: 'id',
    startAt: 10000,
});

export default mongoose.model('Client', ClientSchema);
