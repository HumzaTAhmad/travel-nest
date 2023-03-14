import {Router} from 'express'
import { addToFavorite, createUser, getUser, getUsers, login, removeFromFavorite, updateProfile, updateStatus } from '../controllers/user.js'
import auth from '../middlware/auth.js'

const userRouter = Router()
userRouter.post('/register', createUser)
userRouter.post('/login', login)
userRouter.patch('/updateProfile', auth, updateProfile)
userRouter.get('/', getUsers)
userRouter.get('/:userId', getUser)
userRouter.patch('/updateStatus/:userId', updateStatus)
userRouter.patch('/addToFavorite/:userId', addToFavorite)
userRouter.patch('/removeFromFavorite/:userId', removeFromFavorite)


export default userRouter