import bcrypt from 'bcryptjs'
import userModel from '../models/User.js'
import { JWT } from 'google-auth-library'
import jwt from 'jsonwebtoken'
import tryCatch from './utils/tryCatch.js'
import roomModel from '../models/Room.js'
import { recommendRoom } from './utils/reccomendationEngine.js'
import { getUserLocationFromIP } from './utils/getUserLocation.js'

export const createUser = async (req, res) => {
    try {
        const {name, email, password} = req.body
        if(password.length < 6) return res.status(400).json({success: false, message: 'Password must be 6 characters or more'})
        const emailLowerCase = email.toLowerCase()
        const existedUser = await userModel.findOne({email:emailLowerCase})
        
        if(existedUser) return res.status(400).json({success:false, message:'User already exists!'})
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await userModel.create({
            name,
            email:emailLowerCase,
            password:hashedPassword
        })
        const {_id:id, photoURL, role, active} = user
        const token = jwt.sign({id, name, photoURL, role}, process.env.JWT_SECRET, {expiresIn:'1h'})

        res.status(201).json({success:true, result:{id, name, email:user.email, photoURL, token, role, active}})
    } catch (error) {

        res.status(500).json({success:false, message:'Something went wrong! try again later'})
    }
}

export const login = tryCatch(async (req, res) => {
    const { email, password } = req.body;
    const emailLowerCase = email.toLowerCase();
    const existedUser = await userModel.findOne({ email: emailLowerCase });
    if (!existedUser)
      return res
        .status(404)
        .json({ success: false, message: 'User does not exist!' });
    const correctPassword = await bcrypt.compare(password, existedUser.password);
    if (!correctPassword)
      return res
        .status(400)
        .json({ success: false, message: 'Invalid credentials' });
  
    const { _id: id, name, photoURL, role, active, favoriteRooms } = existedUser;
    if(!active) return res.status(400).json({success:false, message:'This account has been suspended. Contact Admin'})
    const token = jwt.sign({ id, name, photoURL, role}, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({
      success: true,
      result: { id, name, email: emailLowerCase, photoURL, token, role, active, favoriteRooms},
    });
  });

export const updateProfile = tryCatch(async (req, res) => {
  const fields = req.body?.photoURL ? {name:req.body.name, photoURL:req.body.photoURL} : {name:req.body.name}
  console.log('updateProfile RUNS')
  console.log(req.user)
  console.log(req.body)
  const updatedUser = await userModel.findByIdAndUpdate(req.user.id, fields, {new:true})
  const {_id:id, name, photoURL, role} = updatedUser

  //to do: update all the rooms records added by the user so old name and picture don't stay there forever
  await roomModel.updateMany({uid:id}, {uName:name, uPhoto: photoURL})

  const token = jwt.sign({ id, name, photoURL, role}, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.status(200).json({success:true, result:{name, photoURL, token}})
})

export const getUsers = tryCatch(async (req, res) => {
  const users = await userModel.find().sort({_id:-1})
  res.status(200).json({success:true, result:users})
})

export const getUser = tryCatch(async (req, res) => {
  console.log("hi")
  const userId = req.params.userId;
  const user = await userModel.findById(userId).lean().exec(); // Use lean() to get plain JS object

  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }

  // Convert _id field to id field
  user.id = user._id.toString();
  delete user._id, user.password, user.token;

  res.status(200).json({ success: true, result: user });
});

export const updateStatus = tryCatch(async(req, res)=>{
  const {role, active} = req.body
  await userModel.findByIdAndUpdate(req.params.userId, {role, active})
  res.status(200).json({success:true, result:{_id:req.params.userId}})
})

export const addToFavorite = tryCatch(async(req, res)=>{
  const newFavoriteRoom = req.body
  const userId = req.params.userId;

  console.log(newFavoriteRoom)

  const user = await userModel.findById(userId);

  // Add the new favorite room object to the favoriteRooms array
  user.favoriteRooms.push(newFavoriteRoom);

  // Save the updated user document
  await user.save();

  const updatedUser = await userModel.findById(userId).lean().exec(); // Use lean() to get plain JS object

  if (!updatedUser) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }

  updatedUser.id = updatedUser._id.toString();
  delete updatedUser._id, updatedUser.password, updatedUser.token;

  res.status(200).json({ success: true, result: updatedUser });
})

export const removeFromFavorite = tryCatch(async(req, res)=>{
  const roomToRemove= req.body;
  const userId = req.params.userId;

  const user = await userModel.findById(userId);

  // Remove the room from the favoriteRooms array
  user.favoriteRooms = user.favoriteRooms.filter((favRoom) => favRoom._id !== roomToRemove._id);

  // Save the updated user document
  await user.save();

  const updatedUser = await userModel.findById(userId).lean().exec(); // Use lean() to get plain JS object

  if (!updatedUser) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }

  updatedUser.id = updatedUser._id.toString();
  delete updatedUser._id, updatedUser.password, updatedUser.token;
  
  res.status(200).json({ success: true, result: updatedUser });
})

/*export const getRecommendedRooms = tryCatch(async (req, res) => {
  console.log("OOOOOOOOOOOOOOOOOOOOOOO")
  const userId = req.params.userId;
  const recommendedRooms = await recommendRoom(userId);
  res.status(200).json({ success: true, result: recommendedRooms });
});*/

export const getRecommendedRooms = tryCatch(async (req, res) => {
  console.log("OOOOOOOOOOOOOOOOOOOOOOO")
  const userId = req.params.userId;

  // Get the user's IP address (assuming you're not behind a proxy)
  const ip = req.connection.remoteAddress;

  // Get the user's location from their IP address
  const userLocation = await getUserLocationFromIP(ip);

  const recommendedRooms = await recommendRoom(userId, undefined, userLocation);
  res.status(200).json({ success: true, result: recommendedRooms });
});