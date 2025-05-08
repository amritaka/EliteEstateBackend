import express from 'express'
import { getAllProperty, handleLimitProperty, handleRentData, handleSellData, logUserProperty, propertyCreate, propertyDetail, propertystatusChange, propertyUpdate, propertyUpdateStatus, subCategoryReadByIdForProperty } from '../controller/property.controller.js'
import upload from '../utility/multer.js'
import {checkAuth} from '../middleware/checkToken.js'

const propertyRouter = express.Router()

propertyRouter.post('/propertyCreate',upload.single('image'),checkAuth,propertyCreate)
propertyRouter.get('/getProperty',getAllProperty)
propertyRouter.put('/propertyUpdate',propertyUpdate)
propertyRouter.put('/propertystatus',propertystatusChange)
propertyRouter.put('/property/update/:id',propertyUpdateStatus)
propertyRouter.get('/subcatgories/:subCategoryId',subCategoryReadByIdForProperty)
propertyRouter.get('/propertyDetail/:id',propertyDetail)
//logged user properties
propertyRouter.get('/loggedProperty',checkAuth,logUserProperty)
propertyRouter.get('/rentData',handleRentData)
propertyRouter.get('/sellData',handleSellData)
propertyRouter.get('/offerProperty',handleLimitProperty)
propertyRouter.delete('/deleteProperty/:id',handleLimitProperty)

export default propertyRouter