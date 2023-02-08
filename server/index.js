import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config()

const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

//app.use("/albums", albumRoutes)
//app.use("/pictures", pictureRoutes)

const PORT = process.env.PORT || 5000;

app.use('/', (req, res)=>res.json({message: 'Welcome to our API'}))
app.use((req, res)=>res.status(404).json({success:false, message:'Not Found'}))



mongoose.connect(process.env.MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message))
