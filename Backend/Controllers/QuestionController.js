import QuestionModel from "./../Models/QuestionModel.js"
import jwt from 'jsonwebtoken'


export const addQuestion =async(req,res)=>{
    try {
        const{question,first,second,third,fourth,correct}=req.body;
        const{token}=req.body;
        if(!question || !first || !second || !third || !fourth || !correct){
            return res.status(400).json({success:false,message:"All fields are mandatory"})
        }
        const decodedData = jwt.verify(token,process.env.JWT_SECRET)
        if(!decodedData) {
            return res.status(400).json({success:false,message:"Token not found"})
        }

        const userId = decodedData?.userId

        const Question = new QuestionModel({question,first,second,third,fourth,correct,userId:userId})

        await Question.save();

        return res.status(200).json({status:true,message:"Quizz added successfully"})

    } catch (error) {
        return res.status(500).json({status:false,message:error.message})
    }
}

export const allQuestions =async(req,res)=>{
    try {
        const quizzQuestions = await QuestionModel.find({});
        
        if(quizzQuestions?.length){
            return res.status(200).json({success:true,questions:quizzQuestions})
        }
        return res.status(400).json({success:false,message:"No questions found"})
    } catch (error) {
        return res.status(500).json({status:false,message:error.message})
    }
}
