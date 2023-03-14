import {Router} from 'express'
import { addToFavorite, createUser, getUser, getUsers, login, updateProfile, updateStatus } from '../controllers/user.js'
import auth from '../middlware/auth.js'

const userRouter = Router()
userRouter.post('/register', createUser)
userRouter.post('/login', login)
userRouter.patch('/updateProfile', auth, updateProfile)
userRouter.get('/', getUsers)
userRouter.get('/:userId', getUser)
userRouter.patch('/updateStatus/:userId', updateStatus)
userRouter.patch('/addToFavorite/:userId', addToFavorite)


export default userRouter