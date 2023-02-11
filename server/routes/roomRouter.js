import {Router} from 'express'
import { createRoom } from '../controllers/room.js'
import auth from '../middlware/auth.js'

const roomRouter = Router()

roomRouter.post('/', auth, createRoom)

export default roomRouter
