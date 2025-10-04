import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';

const LoginWithGoogle = () => {
  const navigate = useNavigate();
    const[username,setusername]=useState<string>();
    const[showwelcomemessage,setshow]=useState<boolean>(false);
  return (
    <>
    <GoogleLogin
      onSuccess={credentialResponse => {
        const token = credentialResponse.credential;
        axios.post('http://localhost:5237/api/Auth/GoogleAuth', { token })
          .then(async response => {
            alert("Google Login Successful!");
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.username);
            console.log("Logged in as:", response.data.username);
            const { user } = response.data;
            console.log(user);
            console.log('nour here'+user.firstName);
                //alert("Google Login Successful!");
            localStorage.setItem("username", user.username);
            setusername(user.firstName);
            
              await setshow(true);
            
            
          
          })
          .catch(error => {
            alert("Google Login Failed");
            console.error(error);
          });
      }}
      onError={() => {
        alert("Google Sign-In Failed");
      }}
    />
     <Popup show={showwelcomemessage} onClose={()=>navigate("/")} label='Successfully Register' message={`Off 10% on new order ${username}`} ></Popup>
     </>
  );
};

export default LoginWithGoogle;
