import {Router} from 'express'
import { createRoom, deleteRoom, getRooms, updateRoom } from '../controllers/room.js'
import auth from '../middlware/auth.js'
import roomPermissions from '../middlware/permissions/room/roomPermissions.js'
import checkAccess from '../middlware/checkAccess.js'

const roomRouter = Router()

roomRouter.post('/', auth, createRoom)
roomRouter.get('/', getRooms)
roomRouter.delete('/:roomId', auth, checkAccess(roomPermissions.delete), deleteRoom)
roomRouter.patch('/:roomId', auth, checkAccess(roomPermissions.update), updateRoom)

export default roomRouter
