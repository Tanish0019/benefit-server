import mongoose from 'mongoose';
import * as autoIncrement from "mongoose-auto-increment";


const ClientSchema = new mongoose.Schema({
    name: String,
    id: Number,
    email: String,
    mobile: String,
    gender: {
        type: String,
        enum: ['male', 'female']
    },


    coach: {
        type: Schema.Types.ObjectId,
        ref: 'Coach'
    },
    
    premium_expiry: Date,
    premium_start: Date,

    weight: Number,
    height: Number,
    diet: {
        type: String,
        enum: ['veg', 'nonveg']
    },



});

ClientSchema.plugin(autoIncrement.plugin, {
    model: 'Client',
    field: 'id',
    startAt: 10000,
});

export default mongoose.model('Client', ClientSchema);
