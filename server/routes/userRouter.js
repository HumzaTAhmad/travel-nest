import {Router} from 'express'
import { createUser, getUser } from '../controllers/user.js'

const userRouter = Router()
userRouter.post('/register', createUser)
userRouter.get('/login', getUser)

export default userRouter