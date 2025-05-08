import mongoose from 'mongoose'
const { Schema } = mongoose
const propertySchema = new Schema({
    subCategoryId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Subcategory"
    },
    UserId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    propertyName:{
        type:String,
        required:true,
        unique : true
    },
    description:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
         type:String,
         required:true
    },
   image:{
          type:String,
        //   required:true,
          default:null
      },
    price:{
        type:Number,
        required:true
    },
    listingType:{
         type:String,
         enum:["Rent","Sell"],
         default: "Sell"
    },
    approved :{
        type : String,
        enum: ["Approved", "Reject","Pending"],
        default : "Pending"
    },
    status:{
        type:String,
         enum: ["Not Sold","Sold"],
        default : "Not Sold"
    }
}, { timestamps: true })
const Property = mongoose.model('Property', propertySchema)
export default Property