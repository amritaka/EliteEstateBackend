import Apply from "../models/apply.model.js"
import Property from "../models/property.model.js"

export async function applyCreate(req,res) {
    const {propertyId,amountBid,message} = req.body
    const {id}= req.user
    // console.log(id)
    try{
    const property = await Property.findOne({_id:propertyId})
    if(!property){
        return res.status(400).send("property not found")
    }
    const applyProperty = await Apply.findOne({propertyId:property._id,UserId:id})
    

    if(applyProperty){
        return res.status(400).send("Already Apply for this Property")
    }
    const applyOption = new Apply({
        amountBid,
        propertyId:property._id,
        message,
        UserId:id
    })
    // console.log(applyOption)
    await applyOption.save()
    res.status(201).send("success")
}catch(error){
    console.log(error)
    res.status(500).send("server error")
}
}

export async function applyRead(req,res) {
    
    try {
        const appliers = await Apply.find().populate("propertyId","propertyName")
        if(appliers.length == 0){
            res.status(404).send("not found")
        }
        res.status(200).json(appliers)
    } catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
}


export async function UserBid(req,res) {
    const {id} = req.user
    try {
        const appliers = await Apply.find({UserId:id}).populate("propertyId")
        if(appliers.length == 0){
           return res.status(404).send("not found")
        }
        return res.status(200).json(appliers)
    } catch (error) {
        console.log(error)
       return res.status(500).send("server error")
    }
}

export async function singlePropertyApply(req,res) {
    const {id} = req.params
    try {
        const fetchData = await Apply.find({propertyId:id}).populate("UserId")
        res.status(200).send(fetchData)
    } catch (error) {
        console.log(error)
        res.status(500).send("SERVER ERROR")
    }
}
