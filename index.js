import cookieParser from "cookie-parser";
import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from "./src/utils/db.js";
import userRoute from './src/routes/user.route.js'
import companyRoute from './src/routes/company.route.js'
import jobRoute from './src/routes/job.route.js'
import applicationRoute from './src/routes/application.route.js'


dotenv.config({});

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(cookieParser())

const corsOptions = {
    origin: 'http://localhost:5173/',
    Credential: true,
}
app.use(cors(corsOptions))

app.use('/api/v1/user', userRoute)
app.use('/api/v1/company', companyRoute)
app.use('/api/v1/job', jobRoute)
app.use('/api/v1/application', applicationRoute)



const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server runnig at ${PORT}`);
})