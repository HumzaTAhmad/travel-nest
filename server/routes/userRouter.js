import {Router} from 'express'
import { createUser, getUser, updateProfile } from '../controllers/user.js'
import auth from '../middlware/auth.js'

const userRouter = Router()
userRouter.post('/register', createUser)
userRouter.post('/login', getUser)
userRouter.patch('/updateProfile', auth, updateProfile)


export default userRouter