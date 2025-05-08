import express from 'express'
import { categoryReadById, categoryReadByIDForSub, subCategoryCreate, subcategoryDelete, subCategoryRead } from '../controller/subcategory.controller.js'
import { checkAuth } from '../middleware/checkToken.js'

const subcategoryRouter = express.Router()

subcategoryRouter.post('/subcategoryCreate',subCategoryCreate)
// subcategoryRouter.post('/subcategoryCreate',checkAuth,subCategoryCreate)
subcategoryRouter.get('/subcategoryRead',checkAuth ,subCategoryRead)
subcategoryRouter.get('/subcategory',subCategoryRead)
//find subcategory releated category by category name
subcategoryRouter.get('/categories/:categoryId/subcategories',categoryReadById)

//find subcategory releated category by category id
subcategoryRouter.get('/categories/:categoryId',categoryReadByIDForSub)
subcategoryRouter.delete('/subcategoryDelete/:id',subcategoryDelete)

export default subcategoryRouter