import mongoose from "mongoose";
const { Schema } = mongoose
const subCategorySchema = new Schema({
    subCategoryName:{
        type:String,
        enum:["Houses","Flats","Shops","Offices","Plots","Hotels","Factories","Warehouses","Restaurants","Resorts","Farmlands"],
        default:"Plots"
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    }

},{ timestamp: true })
const Subcategory = mongoose.model('Subcategory', subCategorySchema)
export default Subcategory