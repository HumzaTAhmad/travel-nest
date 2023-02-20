import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

async function auth(req, res, next){
    console.log('auth runs')
    try {
        
        const token = req.headers.authorization.split(' ')[1]
        if(token.length > 1000){
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            const payload = ticket.getPayload()
            req.user = {id:payload.sub, name:payload.name, photoURL:payload.picture}
        }else{
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            const {id, name, photoURL} = decodedToken
            req.user = {id, name, photoURL}
        }
        next()
    } catch (error) {
        console.log(error)
        console.log("auth had an error")
        res.status(401).json({success:false, message:'Something is wrong with your authorization'})
    }
}

export default auth