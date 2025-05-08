import mongoose from 'mongoose'
const {Schema} = mongoose
const applySchema = new Schema({
    propertyId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Property",
    },
    amountBid:{
        type:Number,
        required:true
    },
    message:{
        type:String,

    },
    UserId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
},{timestamps:true})
const Apply = mongoose.model('Apply',applySchema)
export default Apply