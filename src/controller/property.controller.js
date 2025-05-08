
import Property from "../models/property.model.js";
import Subcategory from "../models/subcategory.model.js";
import cloudinary from '../config/cloudinary.js'
import Apply from "../models/apply.model.js";


export async function propertyCreate(req, res) {
    const { subCategoryName, propertyName, description, area, state,city, price, listingType, approved } = req.body;
    // console.log(req.file);
    const {id} = req.user

    try {
        const check = await Property.findOne({ propertyName });
        if (check) {
            return res.status(400).send("Property already exists");
        }

        const subCategory = await Subcategory.findOne({ subCategoryName });
        if (!subCategory) {
            return res.status(404).send("Sub Category not Found");
        }

       
        if (!req.file || !req.file.path) {
            return res.status(400).send("No file uploaded");
        }

       
        const uploadResult = await cloudinary.uploader.upload(req.file.path);
        // console.log(uploadResult);

        const propertyOption = new Property({
            propertyName,
            UserId:id,
            description,
            area,
            state,
            city,
            image: uploadResult.secure_url, 
            price,
            listingType,
            approved: approved ? approved : "Pending",
            subCategoryId: subCategory._id
        });

        await propertyOption.save(); 
        res.status(201).send("Property created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}

export async function propertyUpdate(req, res) {
    const { propertyName, amount } = req.body
    try {
        const subcategoryWithProperty = await Property.findOne({ propertyName })
        // console.log(subcategoryWithProperty)
        const updateProperty = await Property.findByIdAndUpdate({ _id: subcategoryWithProperty._id }, { price: amount }, { new: true })
        if (!updateProperty) {
            res.status(400).send("not update")
        }
        res.status(200).json(updateProperty)
    } catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
}

export async function getAllProperty(req, res) {
    try {

        const data = await Property.find().populate("subCategoryId")
        if (!data) {
            return res.status(404).send("NOT FOUND")
        }
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send("INTERNEL SERVER ERROR")
    }
}


export async function propertystatusChange(req, res) {
    const {id, approved  } = req.body
    try {
      
        const updateProperty = await Property.findByIdAndUpdate({ _id: id }, { approved }, { new: true })
        if (!updateProperty) {
            res.status(400).send("not update")
        }
        res.status(200).json(updateProperty)
    } catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
}



export async function propertyUpdateStatus(req, res) {
    const { id } = req.params;  // Get the property ID from the URL params
    const { status, amount } = req.body;  // Get the updated values from the request body

    try {
        const updateData = {};  // Initialize an object to hold the update fields

        // Only add fields to the update object if they exist and are different
        if (status) {
            updateData.status = status;
        }
        if (amount !== undefined) {  // Ensure that 'amount' is not undefined (as 0 can be a valid value)
            updateData.price = amount;
        }

        // Check if there's anything to update
        if (Object.keys(updateData).length === 0) {
            return res.status(400).send("No fields to update.");
        }

        // Perform the update
        const updatedProperty = await Property.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedProperty) {
            return res.status(404).send("Property not found or failed to update.");
        }

        return res.status(200).json(updatedProperty);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}


export async function subCategoryReadByIdForProperty(req,res) {
    try {
        const {subCategoryId}=req.params
        console.log({subCategoryId})
        const subCategoryExists=await Subcategory.findOne({_id:subCategoryId})
        console.log({subCategoryExists}) 
        if(!subCategoryExists){
            return res.status(400).send("Subcategory not found")
        }
        const filteredProperties=await Property.find({subCategoryId:subCategoryExists._id,approved:"Approved"})
        if(!filteredProperties){
            return res.status(400).send("not found")
        }
        res.status(200).send(filteredProperties)
    } catch (error) {
        console.log(error)
        res.status(404).send('no properties found for this subcategory')
    }
}

export async function logUserProperty(req,res) {
    const {id} = req.user
    try {

        const data = await Property.find({UserId:id})
        if (!data) {
            return res.status(404).send("NOT FOUND")
        }
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send("INTERNEL SERVER ERROR")
    }
}

export async function propertyDetail(req,res) {
    console.log(req.params);
    
    try{
        const propertyId = req.params.id
        console.log({propertyId})
     const fetchData =   await Property.findOne({_id:propertyId,approved:"Approved"}).populate("UserId")
     console.log(fetchData)
        res.status(200).send(fetchData)
    }catch(error){
        console.log(error)
        return res.status(500).send("server error")
    }
}

export async function handleRentData(req,res) {
    try {
        const fetchRentData = await Property.find({listingType:"Rent"})
        if (fetchRentData.length === 0) {
            return res.status(404).send("NOT FOUND")
        }
        res.status(200).send(fetchRentData)
        
    } catch (error) {
        return res.status(500).send("SERVER ERROR")
    }
}

export async function handleSellData(req,res) {
    try {
        const fetchSellData = await Property.find({listingType:"Sell"})
        if (fetchSellData.length === 0) {
            return res.status(404).send("NOT FOUND")
        }
        res.status(200).send(fetchSellData)
        
    } catch (error) {
        return res.status(500).send("SERVER ERROR")
    }
}

export async function handleLimitProperty(req,res) {
    try {
        const fetchData = await Property.find({approved:"Approved"}).populate("UserId").limit(7)
        res.status(200).send(fetchData)
        
    } catch (error) {
        console.log(error)
        res.status(500).send("INTERNAL SERVER")
    }
}

export async function handleDeleteProperty(req, res) {
    const { id } = req.body;
    console.log(id);

    try {
        const deletedProperty = await Property.findByIdAndDelete(id);

        if (!deletedProperty) {
            return res.status(404).send("Property not found");
        }

        await Apply.deleteMany({ propertyId: id });

        res.status(200).send(deletedProperty);
    } catch (error) {
        console.error(error);
        res.status(500).send("INTERNAL SERVER ERROR");
    }
}
