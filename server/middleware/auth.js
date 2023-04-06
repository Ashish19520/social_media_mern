import jwt from "jsonwebtoken"

const auth=(req,res,next)=>{ 
    try {
        const token=req.headers.authorization.split(" ")[1];
        const isCustomAuth=token.length<500;
        let decodeAuth;
        if(isCustomAuth&&token){
            decodeAuth=jwt.verify(token,'test');//custom token
            req.userId=decodeAuth?.id;
        }
        else{
            decodeAuth=jwt.decode(token)//google token
            req.user.Id=decodeAuth?.sub;
        }
        next();
   
    } catch (error) {
     console.log(error);   
    }
}
export default auth;