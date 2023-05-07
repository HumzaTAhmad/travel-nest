import roomModel from '../models/Room.js'
import tryCatch from './utils/tryCatch.js'


export const createRoom = tryCatch(async (req, res) => {
    const {id:uid, name:uName, photoURL:uPhoto} = req.user
    const newRoom = new roomModel({...req.body, uid, uName, uPhoto})
    console.log("HHHHH" + newRoom)
    await newRoom.save()
    res.status(201).json({success:true, result:newRoom})
})

export const getRooms = tryCatch(async (req, res) => {
    const rooms = await roomModel.find().sort({_id:-1})
    res.status(200).json({success:true, result:rooms})
})

export const deleteRoom = tryCatch(async(req,res)=>{
    const {_id} = await roomModel.findByIdAndDelete(req.params.roomId)
    res.status(200).json({success:true, result:{_id}})
})

export const updateRoom = tryCatch(async (req, res) => {
    const updatedRoom = await roomModel.findByIdAndUpdate(
      req.params.roomId,
      req.body,
      { new: true }
    );
    res.status(200).json({ success: true, result: updatedRoom });
});