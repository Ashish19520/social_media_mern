import logo from './logo.svg';
import './App.css';
import {Container,Grid,Grow,AppBar,Typography} from "@material-ui/core";
import memories from './images/memories.png';
import Posts from './components/Posts/Posts';
import Form from './components/Forms/Form';
import useStyles from './styles'
import { useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';
import {getPosts} from "./actions/posts"

function App() {
  const classes=useStyles();
  const dispatch=useDispatch();
  const [currentId,setCurrentId]=useState(null);
  useEffect(()=>{
    dispatch(getPosts())
  },[currentId,dispatch])

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color='inherit'>
        <Typography className={classes.heading} variant="h2" align='center'>Memories</Typography>
        <img className={classes.image} src={memories} alt ="memories" height="60"></img>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent='space-between' alignItems="stretch" spacing={3}>
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
    </Container>
  );
}

export default App;
