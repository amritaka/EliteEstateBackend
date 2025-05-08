import mongoose from 'mongoose'
const {Schema} = mongoose
const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobileno:{
        type:Number,
        required:true
    },
    adhaarNumber:{
        type:Number,
        required:true
    },
    userType:{
        type: String,
        enum:["Seller","Buyer","Admin"],
        default : "Seller"
    } ,
    token: {
        type: String
    }
},{timestamps:true})
const User = mongoose.model('User',userSchema)
export default User