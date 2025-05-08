import Category from "../models/category.model.js";
import Property from "../models/property.model.js";
import Subcategory from "../models/subcategory.model.js";


export async function categoryCreate(req, res) {
    const { categoryName} = req.body
    // const {authType} = req.user
    
    // if (authType !== "Admin") {
    //     return res.status(400).send("ONly Admin can Create Category")
    // }
    try {
        const check = await Category.findOne({categoryName })
        if (check) {
            return res.status(400).send("already exists")
        }
        const categoryOption = new Category({
            categoryName
        })
       
        await categoryOption.save()
       
        res.status(201).send("success")
    } catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
}

export async function categoryRead(req,res) {
    
   try {
        const categoriers = await Category.find()
        if(categoriers.lenght == 0){
            res.status(404).send("Not Found")
        }
        res.status(200).json(categoriers)
   } catch (error) {
    console.log(error)
    res.status(500).send("server error")
   }
}

export async function cascadingDelete(req,res) {
    try {
        const categoryId = req.params.id;
    
        // Find subcategories linked to the category
        const subcategories = await Subcategory.find({ categoryId });
    
        // Get all subcategory IDs
        const subcategoryIds = subcategories.map((sub) => sub._id);
    
        // Delete properties linked to the subcategories
        await Property.deleteMany({ subCategoryId: { $in: subcategoryIds } });
    
        // Delete the subcategories
        await Subcategory.deleteMany({ categoryId });
    
        // Delete the category
        await Category.findByIdAndDelete(categoryId);
    
        res.status(200).send('Category and related data deleted successfully.');
      } catch (error) {
        res.status(500).send('Error deleting category');
      }
}