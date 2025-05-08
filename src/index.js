import dotenv from 'dotenv'
dotenv.config()
import connectDB from './db/database.js'
import express from 'express'
import userRouter from './routes/user.routes.js'
import categoryRouter from './routes/category.routes.js'
import subcategoryRouter from './routes/subcategory.routes.js'
import propertyRouter from './routes/property.routes.js'
import cookieParser from 'cookie-parser'
import applyRouter from './routes/apply.routes.js'
import cors from 'cors'
import compression from 'compression'

const app = express()
const port = process.env.PORT
// Use compression middleware
app.use(compression({
    level: 9, // Max compression level
}));
//built in middleware
app.use(cors({
    origin:'*',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Authorization','Content-Type']
}))


app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads',express.static('uploads'))

//router level middleware
app.use('/', userRouter)
app.use('/',categoryRouter)
app.use('/',subcategoryRouter)
app.use('/',propertyRouter)
app.use('/',applyRouter)



connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`SERVER RUN ON http://localhost:${port}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })
