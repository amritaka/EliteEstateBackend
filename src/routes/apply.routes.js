import express from 'express'
import { applyCreate, applyRead, singlePropertyApply, UserBid } from '../controller/apply.controller.js'
import { checkAuth } from '../middleware/checkToken.js'

const applyRouter = express.Router()

applyRouter.post('/applyCreate',checkAuth,applyCreate)
applyRouter.get('/applyRead',applyRead)
applyRouter.get('/showUserBid',checkAuth,UserBid)
applyRouter.get('/fetchSingleProperty/:id',singlePropertyApply)

export default applyRouter

