import React,{useEffect} from 'react'
import {PaginationItem,Pagination}from "@mui/material";
 import useStyles from './styles';
 import {Link} from "react-router-dom"
 import {useDispatch,useSelector} from 'react-redux';
 import {getPosts} from '../actions/posts';


function Paginate({page}) {
    const {numberOfPages} = useSelector((state)=>state.posts);
    const classes=useStyles();
    const dispatch =useDispatch();

    useEffect(()=>{
      if(page) dispatch(getPosts(page));
    },[page]);

  return (
   
    <Pagination 
      classes={{ul:classes.ui}}
      count={numberOfPages}
      page={Number(page)||1}
      variant="outlined"
      color="primary"
      renderItem={(item)=>(
          <PaginationItem {...item} component={Link}
          to={`/posts?page=${item.page}`}/>
      )} />
  )
}

export default Paginate;
