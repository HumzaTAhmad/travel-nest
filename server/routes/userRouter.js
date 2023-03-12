import {Router} from 'express'
import { createUser, getUser, getUsers, updateProfile, updateStatus } from '../controllers/user.js'
import auth from '../middlware/auth.js'

const userRouter = Router()
userRouter.post('/register', createUser)
userRouter.post('/login', getUser)
userRouter.patch('/updateProfile', auth, updateProfile)
userRouter.get('/', getUsers)
userRouter.patch('/updateStatus/:userId', updateStatus)


export default userRouter