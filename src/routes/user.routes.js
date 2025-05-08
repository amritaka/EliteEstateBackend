import express from 'express'
import {userRegister,userGetData,userLogin,userUpdate,userDelete, getLogUser} from '../controller/user.controller.js'
import {checkAuth} from '../middleware/checkToken.js'
const userRouter = express.Router()

userRouter.post('/regUser',userRegister)
userRouter.get('/getUser',checkAuth,userGetData)
userRouter.post('/logUser',userLogin)
userRouter.put('/updUser/:id',userUpdate)
userRouter.delete('/delUser',userDelete)
userRouter.get('/getLog',checkAuth,getLogUser)

export default userRouter