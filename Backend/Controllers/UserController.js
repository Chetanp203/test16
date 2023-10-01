import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register =async(req,res)=>{
    try {
        //const {userData}=req.body;
        const{name,email,password,role}=req.body;
        if(!name || !email || !password || !role)
        return res.status(400).json({success:false,message:"All fields are mandatory"})

        const isEmailExist= await UserModel.find({email:email})
        if(isEmailExist.length){
         return res.status(400).json({success:false,message:"Email already exists"})
        }
        const hashPassword = await bcrypt.hash(password,10)

        const user = new UserModel({name,email,password:hashPassword,role})
        await user.save();
        return res.status(200).json({success:true,message:"User registered successfully"})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

export const login =async(req,res)=>{
    try{
    const {email,password}= req.body.userData;
    if(!email || !password)
    return res.status(400).json({success:false,message:"All fields are mandatory"})
    
    const user = await UserModel.findOne({email})
    if(!user) return res.status(400).json({success:false,message:"User not found"})

    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    if(isPasswordCorrect){
        const userCreds ={
            name:user.name,
            email:user.email,
            _id:user._id,
            role:user.role
        }
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET)
        return res.status(200).json({success:true,message:"Login Successfull",user:userCreds,token:token})
    }
    return res.status(400).json({success:false,message:"Password incorrect"})
}
catch(error){
    return res.status(500).json({success:false,message:error.message})
}
}

export const getCurrentUser=async(req,res)=>{
    try {
        const {token}=req.body;
        const decodeToken=jwt.verify(token,process.env.JWT_SECRET)
        if(!decodeToken) return res.status(40).json({success:false,message:"tokwn is not valid"});

        const user=await UserModel.findById(decodeToken.userId)
        return res.status(200).json({success:true,user});
    } catch (error) {
        console.log(error);
        return res.status(406).json({success:false,message:"token"})
    }
}