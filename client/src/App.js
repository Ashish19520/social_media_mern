
import './App.css';
import {Container} from "@material-ui/core";
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes, Outlet,Navigate} from "react-router-dom";
import Home from './components/Home/Home';
import Auth from './components/auth/Auth';
import {GoogleOAuthProvider} from "@react-oauth/google"
import PostDetails from './components/PostDetails/PostDetails';
function App() {
const user=JSON.parse(localStorage.getItem('profile')); 

  return (
    <Container maxWidth="xl">
       <BrowserRouter>
       <Navbar/>
       <GoogleOAuthProvider clientId={`${process.env.REACT_APP_Google_Client_Id}`}>
        {console.log(process.env.REACT_APP_Google_Client_Id)}
       <Routes>
            <Route path="/" element={<Navigate to ="/posts" /> }></Route> 
            <Route path="/posts" element={<Home/>}></Route> 
            <Route path="/posts/search" element={<Home/>}></Route> 
            <Route path="/posts/:id" element={<PostDetails/>}></Route> 
            <Route path="/auth" element={(!user?<Auth/>:<Navigate to="/posts/"/>)}></Route> 
        </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </Container>
  );
}

export default App;
