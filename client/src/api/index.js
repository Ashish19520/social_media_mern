import axios from "axios";
// const API=axios.create({baseUrl:"http://localhost:5000"})
const baseUrl="http://localhost:5000";

export const fetchPosts=()=>axios.get(baseUrl+'/posts');
export const createPost=(newPost)=>axios.post(baseUrl+"/posts",newPost);
export const updatePost=(id,updatedPost)=>axios.patch(baseUrl+`/posts/${id}`,updatedPost);
export const deletePost=(id)=>axios.delete(baseUrl+`/posts/${id}`);
export const likePost=(id)=>axios.patch(baseUrl+`/posts/${id}/likePost`);

export const signIn=(formData)=>axios.post(baseUrl+'/user/signin',formData);
export const signup=(formData)=>axios.post(baseUrl+'/user/signup',formData);