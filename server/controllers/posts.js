import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
            const postMessages=await PostMessage.find();
            res.status(200).json(postMessages);
  } catch (error) {
            res.status(404).json({message:error.message});
  }
};

export const createPost=async (req,res)=>{
    const body=req.body;
    const newPost=new PostMessage({...body,creator:req.userId,createdAt:new Date().toISOString()});
   try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        // console.log(error);
        res.status(409).json({message:error.message});
    }
}
export const updatePost=async(req,res)=>{
    const {id: _id}=req.params;
    const post=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with that id');
    try {
        const updatedPost=await PostMessage.findByIdAndUpdate(_id,post,{new:true});
        res.json(updatedPost);
    } catch (error) {
        console.log(error.message)
    }
}
export const deletePost=async(req,res)=>{
    const {id:_id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with that id')
    try {
        await PostMessage.findByIdAndRemove(_id);
        res.json({message:"Post deleted successfuly"});
    } catch (error) {
        console.log(error);
    }
}

export const likePost=async(req,res)=>{
   
    const {id:_id}=req.params;
    if(!req.userId) return res.json({message:"Unauthenticated"})
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with that id');
    try {
       const Post=await PostMessage.findById(_id);
       const index=Post.likes.findIndex((id)=>id===String(req.userId));
       if(index===-1){
        Post.likes.push(req.userId);
       }
       else{
        Post.likes=Post.likes.filter((id)=>id!=String(req.userId));
       }
       const updatedPost=await PostMessage.findOneAndUpdate(_id,Post,{new:true});
       res.json(updatedPost);
    } catch (error) {
        console.log(error);
    }
}