import mongoose from 'mongoose';

const WorkoutSchema = new mongoose.Schema({

    name: String,
    search_name: {
        type: String,
        unique: true
    },
    description: String,
    exercises: [{
        exercise: {
            type: Schema.Types.ObjectId,
            ref: 'Routine'
        } ,
        reps : Number ,
        rest : Number
    }]
});

export default mongoose.model('Workout', WorkoutSchema);
