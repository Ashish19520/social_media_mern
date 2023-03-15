import React from 'react'
import {Grid,Grow,Container} from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';
import useStyles from '../../styles';
import {getPosts} from "../../actions/posts"
import Posts from '../Posts/Posts';
import Form from '../Forms/Form';

function Home() {

    const classes=useStyles();
    const dispatch=useDispatch();
    const [currentId,setCurrentId]=useState(null);

    useEffect(()=>{
    dispatch(getPosts())
    },[currentId,dispatch])

  return (
    <Grow in>
        <Container>
          <Grid container direction="column-reverse" justifyContent='space-between' alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts
                // currentId={currentId} 
                setCurrentId={setCurrentId} 
               />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form
               currentId={currentId} setCurrentId={setCurrentId} 
               />
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home