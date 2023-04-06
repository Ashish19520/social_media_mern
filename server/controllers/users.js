import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import Users from "../models/users.js"
export const signin=async(req,res)=>{
    const {email,password}=req.body;
    try {
        Users.findOne({email:email},async (err,user)=>{
            if(err){
                console.log(err);
            }
            else{
                if(!user) return res.status(404).json({message:"User doesn't exists"});
                const isPasswordCorrect=await bcrypt.compare(password,user.password);
                if(!isPasswordCorrect) return res.status(400).json({message:"Invalid Credentials"});
                const token=jwt.sign({email:user.email,id:user._id},"test",{expiresIn:"1h"});
                res.status(200).json({result:user,token});
            }
        });
        
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
        console.log(error);
    }
}
export const signup=async(req,res)=>{
    const {email,password,confirmPassword,firstName,lastName}=req.body;
    try {
       Users.findOne({email:email}, async(err, user) => {
        if (err) {
          console.log("---",err);
          return;
        }
        else {
            if(user) return res.status(401).json({message:"User already exist's"});
            if(password!=confirmPassword) return res.status(400).json({message:"password mismatch"});
             const hashedPassword=await bcrypt.hash(password,12);
             const result=await Users.create({email,password:hashedPassword,name:`${firstName} ${lastName}`}); 
             const token=await jwt.sign({email:result.email,id:result._id},"test",{expiresIn:"1h"});
            await res.status(200).json({result:result,token});
        }
    });
      
    
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong"});
    }
}