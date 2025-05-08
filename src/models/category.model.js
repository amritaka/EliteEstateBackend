import mongoose from 'mongoose'
const {Schema} = mongoose
const categorySchema = new Schema({
    categoryName:{
        type:String,
        enum:["Residential","Commercial","Industrial","Agricultural"],
        default:"Commercial"
    }
},{timestamps:true})
const Category = mongoose.model('Category',categorySchema)
export default Category