
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import { createToken } from '../middleware/token.js'

export async function userRegister(req, res) {
    const { userName, email, password, mobileno, adhaarNumber} = req.body

    try {
        let typeOfUSer = ""
        if (email === process.env.ADMIN_Email && password === process.env.PASSWORD) {
            typeOfUSer = "Admin"
        } else {
            typeOfUSer = "Seller"
        }
        // console.log(typeOfUSer)
        const check = await User.findOne({ email })
        if (check?.userType === "Admin") {
            return res.status(400).send('Already exists')
        }
        if (check) {
            return res.status(400).send('Already exists')
        }
    
        const hashPassword = await bcrypt.hash(password, 10)
        const option = new User(
            {
                userName,
                email,
                password: hashPassword,
                mobileno,
                adhaarNumber,
                userType: typeOfUSer
            }
        )
        await option.save()
        return res.status(200).send('success')
    } catch (error) {
        console.log(error)
        return res.status(500).send('SERVER ERROR')
    }
}

export async function userGetData(req, res) {
    // const {id} = req.user
    try {
        const getData = await User.find()
        console.log(getData)
        if (getData.length == 0) {
            return res.status(404).send("NOT FOUND")
        }
        res.status(200).send(getData)
    } catch (error) {
        console.log(error)
        res.status(500).send('SERVER ERROR')
    }
}

export async function userLogin(req, res) {
    const { email, password } = req.body
    try {

      let  getOneData = await User.findOne({ email })
        const isValidPassword = await bcrypt.compare(password, getOneData.password)
        if (!isValidPassword) {
            return res.status(404).send("Email or Password is wrong")
        }

        let token = createToken(getOneData)
        getOneData.token = token
        await getOneData.save()



        // console.log(getOneData)

        let typeOfUSer = getOneData.userType
        res.cookie('authToken', token, {
            httpOnly: true
        })
        // let adminToken = getOneData.token 
        let data = {
            email,
            typeOfUSer,
            token
        }
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
        res.status(500).send("SERVER ERROR")
    }
}

export async function userUpdate(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;
    
        // 1. Fetch existing user to compare password
        const existingUser = await User.findById(id);
        if (!existingUser) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // 2. Only hash password if it's changed (and not already hashed)
        if (updateData.password && updateData.password !== existingUser.password) {
          const isHashed = updateData.password.startsWith('$2b$'); // bcrypt hash check
          if (!isHashed) {
            const hashPassword = await bcrypt.hash(updateData.password, 10);
            updateData.password = hashPassword;
          }
        }
    
        if (!Object.keys(updateData).length) {
          return res.status(400).json({ message: 'No fields provided for update' });
        }
    
        const updateAuth = await User.findByIdAndUpdate(
          id,
          { $set: updateData },
          { new: true }
        );
    
        if (!updateAuth) {
          return res.status(404).json({ message: 'Document not found' });
        }
    
        res.status(200).json({ message: 'Update successful', updateAuth });
    
      } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
      }
}

export async function userDelete(req, res) {
    const { id } = req.body
    console.log(req.body)
    try {
        const delUser = await User.findByIdAndDelete({ _id: id })
        if (!delUser) {
            res.status(400).send('not deleted')
        }
        res.status(200).send(delUser)
    } catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
}

export async function getLogUser(req, res) {
     const {id} = req.user
    try {
        const getData = await User.findOne({_id:id})
        // console.log(getData)
        if (getData.length == 0) {
            return res.status(404).send("NOT FOUND")
        }
        res.status(200).send(getData)
    } catch (error) {
        console.log(error)
        res.status(500).send('SERVER ERROR')
    }
}



