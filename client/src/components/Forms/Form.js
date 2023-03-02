import React from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useState, useEffect } from 'react';
import FileBase from "react-file-base64"
import {useDispatch,useSelector} from "react-redux";
import { createPost,updatePost } from "../../actions/posts";

export default function Form({currentId,setCurrentId}) {
  const classes = useStyles();
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const dispatch=useDispatch();
  const post=useSelector((state)=>currentId?state.posts.find((p)=>p._id===currentId):null);

  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(currentId){
      dispatch(updatePost(currentId,postData))
    }
    else{
    dispatch(createPost(postData));
    }
  }

  useEffect(()=>{
    if(post) setPostData(post);
  },[post])
  const clear=()=>{

  }
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {/* {currentId ? `Editing "${post.title}"` : "Creating a Memory"} */}
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}
