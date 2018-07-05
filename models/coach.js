import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const CoachSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
        select: false
    },
});

CoachSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.hash(user.password, null, null, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

CoachSchema.methods.comparePassword = function (password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
};

export default mongoose.model('Coach', CoachSchema);
