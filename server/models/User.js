import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type:String, min:2, max:50, required:true},
    email:{type:String, min:2, max:50, required:true, unique: true},
    password:{type:String, required:true},
    photoURL:{type:String, default:''}
})

const userModel = mongoose.model('userModel', userSchema)
export default userModel