import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import Users from '../models/users.js';

export const signin=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const existingUser=Users.findOne({email});
        if(!existingUser) return res.status(404).json({message:"User doesn't exists"});
        const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid Credentials"});
        const token=jwt.sign({email:existingUser.email,id:existingUser._id},"test",{expiresIn:"1h"});
        res.status(200).json({result:existingUser,token});
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
}
export const signup=async(req,res)=>{
    const {email,password,confirmPassword,firstName,lastName}=req.body;
    try {
       const existingUser=Users.findOne({email});
       if(existingUser) return res.status(401).json({message:"User already exist's"});
       if(password!=confirmPassword) return res.status(400).json({message:"password mismatch"});
        const result=await Users.create({email,password:hashedPassword,name:`${firstName} ${lastName}`});
        const hashedPassword=bcrypt.hash(password,12);
        const token=jwt.sign({email:result.email,id:result._id},"test",{expiresIn:"1h"});
        res.result(200).json({result:result,token});
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
}