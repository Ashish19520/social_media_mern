import React,{useState,useRef} from 'react'
import {Typography,Button,TextField} from "@material-ui/core"
import {useDispatch} from "react-redux"
import styles from "./styles";  
import {commentPost} from '../../actions/posts';


function Comments({post}) {
    
    const classes=styles();
    const [comments,setComments]=useState(post?.comment);
    console.log("------",comments)
    const [comment,setComment]=useState('');
    const user=JSON.parse(localStorage.getItem('profile'));
    const dispatch=useDispatch();

    
    const handleClick=()=>{
    const finalComment=`${user.result.name}:${comment}`;
    dispatch(commentPost(finalComment,post._id));
    }
  return (
    <div>
        <div className={classes.commentOuterContainer}>
            <div className={classes.commentInnerContainer}>
                <Typography gutterBottom variant='h6'>Comments</Typography>
                {comments?.map((c,i)=>(
                    <Typography key={i} gutterBottom variant='subtitle1'>
                        {c}
                    </Typography>
                ))}
            </div>
            {user?.result.name&&(
            <div style={{width:'70%'}}>
                <Typography gutterBottom variant='h6'>Write a comment</Typography>
                <TextField
                fullWidth
                row={4}
                variant='outlined'
                label="Comment"
                multiline
                value={comment}
                onChange={(e)=>setComment(e.target.value)}/>
                <Button
                style={{marginTop:'10px'}}
                fullWidth
                disabled={!comment}
                variant='container'
                onClick={handleClick}
                color="primary"
                >
                Comment
                </Button>
               
            </div>
            )}
        </div>
    </div>
  )
}

export default Comments;
