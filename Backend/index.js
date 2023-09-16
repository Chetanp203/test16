import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose';
import { getCurrentUser, login, register } from './Controllers/UserController.js';
import { addQuestion, allQuestions } from './Controllers/QuestionController.js';


const app = express();
dotenv.config();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json())

app.get('/',function(req,res){
    res.send("working")
})

app.post('/register',register)
app.post('/login',login)
app.get('/get-current-user',getCurrentUser)
app.post('/add-question',addQuestion)
app.get('/all-questions',allQuestions)


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to DB")
}).catch((error)=>{
    console.log("error while connecting to DB",error)
})

app.listen(8000,()=>{
    console.log("listening from 7000 server");
})