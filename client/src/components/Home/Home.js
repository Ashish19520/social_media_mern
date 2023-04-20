import React from 'react'
import { Grid, Grow, Container, Paper, AppBar, TextField, Button } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import useStyles from './styles';
import { getPosts,getPostsBySearch } from "../../actions/posts"
import { useNavigate, useLocation } from 'react-router-dom';
import Posts from '../Posts/Posts';
import Form from '../Forms/Form';
import ChipInput from 'material-ui-chip-input'
import Paginate from '../Paginate';

function Home() {

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const [search,setSearch]=useState('');
  const [tags,setTags]=useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const user = JSON.parse(localStorage.getItem('profile'));
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  // useEffect(() => {
  //   if (user?.result?.name) {
  //     dispatch(getPosts())
  //   }
  // }, [currentId, dispatch]);

  const searchPost=()=>{
    if(search.trim()||tags){
      dispatch(getPostsBySearch({search:search,tags:tags.join(',')}));
     navigate(`/posts/search?searchQuery=${search||"none"}&tags=${tags.join(',')}`);
  }else{
    navigate('/');
  }
}

  const handleKeyPress=(e)=>{
      if(e.keyCode===13){
        searchPost();
        
      }
  }
  const handleAdd = (tag) => {
    setTags([...tags, tag])
   
  }
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag!== tagToDelete))
  }

  return (
    <Grow in>
      <Container>
        <Grid
          container
          direction="column-reverse"
          justifyContent='center'
          alignItems="stretch"
          className={classes.gridContainer}
          spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts
              // currentId={currentId} 
              setCurrentId={setCurrentId}
            />
          </Grid>
          <Grid 
          item xs={12} 
          sm={6} 
          md={3}>
            <AppBar className={classes.appBarSearch}
              position="static" color='inherit'>
              <TextField
                name='search'
                variant='outlined'
                label="Search Memories"
                fullWidth
                onKeyUp={handleKeyPress}
                value={search}
                onChange={(e) =>setSearch(e.target.value)}
              />
              <ChipInput
                style={{margin:'10px 0'}}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant='outlined'
              />

            <Button 
            onClick={searchPost}
            className={classes.searchButton}
            color="primary"
            variant='contained'> Search</Button>
            </AppBar>
            <Form
              currentId={currentId} setCurrentId={setCurrentId}
            />
            <Paper
              // className={classes.pagination} 
              elevation={6}>
              <Paginate page={page}/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home