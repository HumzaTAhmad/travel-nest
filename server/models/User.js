import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type:String, min:2, max:50, required},
    email:{type:String, min:2, max:50, required, unique: true},
    password:{type:String, required},
    photoURL:{type:String, default:''}
})

const User = mongoose.model('users', userSchema)
export default User