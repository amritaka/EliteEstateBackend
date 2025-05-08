import { validateToken } from "./token.js";
import User from "../models/user.model.js";

export async function checkAuth(req,res,next){
    const token = req.headers.authorization?.split(' ')[1]
    // console.log({token})

    if(!token){
        return res.status(401).send("Unauthorized")
    }
    try {
        const userPayload = validateToken(token)
        // console.log({userPayload})
        req.user = userPayload
        const {id} = req.user
        // console.log(id);
        
        const userData = await User.findById(id)
        if(userData.token === null){
            return res.status(401).send("Unauthorized")
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).send("Something Went Wrong")
    }
}