import mongoose , { Schema } from 'mongoose';

const MeasurementSchema = new mongoose.Schema({

    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },

    date: String,

    weight: Number,
    height: Number,
    waist: Number,
    neck: Number,
    hip: Number

});


export default mongoose.model('Measurement', MeasurementSchema);
