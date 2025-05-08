import mongoose from 'mongoose'
const connectDB = async () => {
    try{
    const connectionDb = await mongoose.connect(`${process.env.MONGO_DB}/${process.env.DB_NAME}`)
    const response = connectionDb.connection.host
    console.log(`MONGODB RUN ON ${response}`)
}catch(error){
    console.log(error)
}
}
export default connectDB