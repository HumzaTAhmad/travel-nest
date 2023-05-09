import {Router} from 'express'
import { addToFavorite, createUser, getRecommendedRooms, getUser, getUsers, login, removeFromFavorite, updateProfile, updateStatus } from '../controllers/user.js'
import auth from '../middlware/auth.js'
import checkAccess from '../middlware/checkAccess.js'
import userPermissions from '../middlware/permissions/user/userPermissions.js'

const userRouter = Router()
userRouter.post('/register', createUser)
userRouter.post('/login', login)
userRouter.patch('/updateProfile', auth, updateProfile)
userRouter.get('/', auth, getUsers)
//userRouter.get('/', auth, checkAccess(userPermissions.listUsers), getUsers)
userRouter.get('/:userId', getUser)
userRouter.patch('/updateStatus/:userId', auth, checkAccess(userPermissions.updateStatus), updateStatus)
userRouter.patch('/addToFavorite/:userId', addToFavorite)
userRouter.patch('/removeFromFavorite/:userId', removeFromFavorite)
userRouter.get('/recommendations/:userId', getRecommendedRooms);

export default userRouter