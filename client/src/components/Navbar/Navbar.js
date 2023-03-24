import React,{useState,useEffect} from 'react'
import {AppBar,Avatar,Toolbar,Typography,Button} from "@material-ui/core";
import {json, Link} from 'react-router-dom';
import useStyles from './styles'
import memories from '../../images/memories.png'
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';



const Navbar =()=> {
    const classes=useStyles();
   
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    const navigate=useNavigate();
    const dispatch=useDispatch();
    console.log(user);
    useEffect(() => {
        const clientId=user?.clientId;
      

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, []);
    const signOut=()=>{
        setUser(null);
        dispatch({type:'LOGOUT'})
        navigate('/');
        localStorage.clear();
    }
  return (
   
        <AppBar className={classes.appBar} position="static" color='inherit'>
        <div className={classes.brandContainer}>
        <Typography component={Link} className={classes.heading} variant="h2" align='center'>Memories</Typography>
        <img className={classes.image} src={memories} alt ="memories" height="60"></img>
        </div>
        <Toolbar className={classes.toolbar}>
            {user?(
                <div className={classes.profile}>
                    {/* <Avatar className={classes.purple} 
                    alt={"raam"} 
                    src={user.result.name.charAt(0)
                    }></Avatar> */}
                    <Typography className={classes.userName} variant="h6">Raam Raam ji</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={signOut}>Logout</Button>
                </div>
            ):(
                <Button component={Link} to="/auth" variant="contained" color="primary">Signin</Button>

            )}
            {/* {user?(
                <div>Logged In</div>
            ):(
                <GoogleLogin
                onSuccess={(response)=>console.log(response)}
                onError={()=>console.log('Error')}
                />
            )} */}
        </Toolbar>

      </AppBar>
  )
};
export default Navbar;
