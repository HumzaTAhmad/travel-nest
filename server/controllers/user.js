import bcrypt from 'bcryptjs'
import userModel from '../models/User.js'
import { JWT } from 'google-auth-library'
import jwt from 'jsonwebtoken'

export const createUser = async (req, res) => {
    try {
        const {name, email, password} = req.body
        if(password.length < 6) return res.status(400).json({success: false, message: 'Password must be 6 characters or more'})
        const emailLowerCase = email.toLowerCase()
        console.log(emailLowerCase)
        const existedUser = await userModel.findOne({email:emailLowerCase})
        
        if(existedUser) return res.status(400).json({success:false, message:'User already exists!'})
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await userModel.create({
            name,
            email:emailLowerCase,
            password:hashedPassword
        })
        const {_id:id, photoURL} = user
        const token = jwt.sign({id, name, photoURL}, process.env.JWT_SECRET, {expiresIn:'1h'})
        console.log(token)
        res.status(201).json({success:true, result:{id, name, email:user.email, photoURL, token}})
    } catch (error) {
        console.log(error)
        console.log("THIS ABOUT TO RUn")
        res.status(500).json({success:false, message:'Something went wrong! try again later'})
    }
}

export const getUser = async (req, res) => {
    console.log(req.query)
    try {
        const {email, password} = req.query
        
        const emailLowerCase = email.toLowerCase()
        const existedUser = await userModel.findOne({email:emailLowerCase})
        
        if(!existedUser) return res.status(404).json({success:false, message:'User doesn not exist!'})
        const correctPassword = await bcrypt.compare(password, existedUser.password)
        if (!correctPassword) return res.status(400).json({success:false, message:'Invalid credentials'})
 
        const {_id:id, name, photoURL} = existedUser
        const token = jwt.sign({id, name, photoURL}, process.env.JWT_SECRET, {expiresIn:'1h'})
        res.status(200).json({success:true, result:{id, name, email:emailLowerCase, photoURL, token}})
    } catch (error) {
        console.log(error)
        console.log("THIS ABOUT TO RUn")
        res.status(500).json({success:false, message:'Something went wrong! try again later'})
    }
}