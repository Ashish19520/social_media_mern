
import './App.css';
import {Container} from "@material-ui/core";
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Home from './components/Home/Home';
import Auth from './components/auth/Auth';
import {GoogleOAuthProvider} from "@react-oauth/google"

function App() {


  return (
    <Container maxWidth="lg">
       <BrowserRouter>
       <Navbar/>
       <GoogleOAuthProvider clientId={`${process.env.REACT_APP_Google_Client_Id}`}>
        {console.log(process.env.REACT_APP_Google_Client_Id)}
       <Routes>
            <Route path="/" element={<Home/>}></Route> 
            <Route path="/auth" element={<Auth/>}></Route> 
        </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </Container>
  );
}

export default App;
