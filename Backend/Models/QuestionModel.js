import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
    question:{
        type:String,
        required:true
    },
    first:{
        type:String,
        required:true
    },
    second:{
        type:String,
        required:true
    },
    third:{
        type:String,
        required:true
    },
    fourth:{
        type:String,
        required:true
    },
    correct:{
        type:String,
        required:true
    }
})

export default mongoose.model("Question",questionSchema)