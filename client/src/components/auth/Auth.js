import React, { useState } from "react";
import style from "./style";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Typography,
  Container,
  Grid,
  TextField,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import {signin,signup} from "../../actions/auth";

const initalState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''}
function Auth() {
  const classes = style;
  const dispatch=useDispatch();
  const [isSignup, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData,setFormData]=useState(initalState);
  const navigate=useNavigate();
  

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup){
      dispatch(signup(formData,navigate));
    }
    else{
      dispatch(signin(formData,navigate));
    }   };
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
    
  };
  const switchMode = () => {
    setIsSignUp((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  const googleSuccess=async (res)=>{
    const clientId=res?.clientId;
    const credential=res?.credential;
    try {
      dispatch({type:'AUTH',data:{clientId,credential}});
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <GoogleLogin
            onSuccess={googleSuccess}
            onError={() => console.log("Error")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justify-content="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account?sign In"
                  : "Don't have an account?sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
