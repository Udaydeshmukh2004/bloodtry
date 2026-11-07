import mongoose, {Schema} from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true

    },
    phone: {
        type: Number,
        min: 10,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    isDoner: {
        type: Boolean,
        required: true
    },
    password: {
        type:String,
        required: true,
    },
    isDoctor: {
        type:Boolean
    },
    degree :{
        type: String
    },
    specialization: {
        type:String
    }
})

const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;
