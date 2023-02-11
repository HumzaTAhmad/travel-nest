import bcrypt from 'bcrypt.js'
import User from '../models/User'
import { JWT } from 'google-auth-library'

export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body
        if(password.length < 6) return res.status(400).json({success: false, message: 'Password must be 6 characters or more'})
        const emailLowerCase = email.toLowerCase()
        const existedUser = await User.findOne({email:emailLowerCase})
        if(existedUser) return res.status(400).json({success:false, message:'User already exists!'})
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await User.create({
            name,
            email:email,
            password:hashedPassword
        })
        const {_id:id, photoURL} = user
        const token = jwt.sign({id, name, photoURL}, process.env.JWT_SECRET, {expirationIn:'1h'})
        res.status(201).json({success:true, result:{id, name, email:user.email, phototURL, token}})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:'Something went wrong! try again later'})
    }
}