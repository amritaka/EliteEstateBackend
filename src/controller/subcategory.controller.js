import mongoose from "mongoose";
import Category from "../models/category.model.js";
import Property from "../models/property.model.js";

import Subcategory from "../models/subcategory.model.js";

export async function subCategoryCreate(req, res) {
    const { categoryName, subCategoryName} = req.body
    // const {authType} = req.user

    // if(authType !== "Admin"){
        // return res.status(400).send("only Admin can Create Subcategory")
    // }
    try {
        const check = await Category.findOne({categoryName })
        if (!check) {
            return res.status(404).send("Category not found")
        }
        const checkSub = await Subcategory.find({subCategoryName})
        if(checkSub.length !==0){
            return res.status(404).send("Already Exits")
        }
        const checkBoth = await Subcategory.find({subCategoryName,categoryId:check._id})
        if(checkBoth.length !==0){
            return res.status(404).send("Already Exits")
        }

        const subCategoryOption = new Subcategory({
            subCategoryName,
            categoryId: check._id
        })
      
        await subCategoryOption.save()
       
        res.status(201).send("success")
    } catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
}

export async function subCategoryRead(req,res) {
   
   try {
    const subcategories =  await Subcategory.find().populate("categoryId")
       
        if(subcategories.lenght == 0){
            res.status(404).send("not found")
        }
        res.status(200).json(subcategories)
   } catch (error) {
    console.log(error)
    res.status(500).send("server error")
   }
}

export async function categoryReadById(req,res) {
    try {
        const {categoryId}=req.params
        console.log({categoryId})
        const categoryExists=await Category.findOne({categoryName:categoryId})
        console.log({categoryExists}) 
        if(!categoryExists){
            return res.status(400).send("category not found")
        }
        const filteredSubcategories=await Subcategory.find({categoryId:categoryExists._id})
        if(!filteredSubcategories){
            return res.status(400).send("not found")
        }
        res.status(200).send(filteredSubcategories)
    } catch (error) {
        console.log(error)
        res.status(404).send('no subcategories found for this category')
    }
}


export async function categoryReadByIDForSub(req,res) {
    try {
        const {categoryId}=req.params
        console.log({categoryId})
        const categoryExists=await Category.findOne({_id:categoryId})
        console.log({categoryExists}) 
        if(!categoryExists){
            return res.status(400).send("category not found")
        }
        const filteredSubcategories=await Subcategory.find({categoryId:categoryExists._id})
        if(!filteredSubcategories){
            return res.status(400).send("not found")
        }
        res.status(200).send(filteredSubcategories)
    } catch (error) {
        console.log(error)
        res.status(404).send('no subcategories found for this category')
    }
}

export async function subcategoryDelete(req,res) {
    // console.log(req.params)
    try {
        const subCategoryId = req.params.id;
        console.log({subCategoryId})
         // Delete properties linked to the subcategories
         await Property.deleteMany({ subCategoryId});

         await Subcategory.findByIdAndDelete({_id:subCategoryId})

         res.status(200).send("Delete successfully")

    } catch (error) {
        console.log(error)
        return res.status(500).send("SERVER ERROR")
    }
    
}