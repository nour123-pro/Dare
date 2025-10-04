import { useState } from 'react';
import '../assets/Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';

import GoogleLoginButton from './GloginButton';
export default function Login(){
    const[username,setusername]=useState<string>();
    const[password,setpassword]=useState<string>();
    const[showwelcomemessage,setshow]=useState<boolean>(false);
    const DataSent={
        username: username,
        password:password
    }
  
    console.log(DataSent);
    const navigate=useNavigate();
    const SendApiData=async ()=>{
      
        const api = 'http://localhost:5237/api/User/Login';
        try {
            const response=await axios.post(api,DataSent,{
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                }
            })
            if(response.status==200){
              
                setshow(true);
                
              
                console.log(response);
                if(username!=null){
                    localStorage.setItem("username",username);
                    localStorage.setItem("UserId",response.data.userId);
                }
               
            }
        } catch (error) {
            alert(error);
            setshow(true);
        }
       
    };
    return(
      
             <div className="sign">
<div className="wrapper" style={{ backgroundImage: "url('images/bg-registration-form-1.jpg')" }}>
			<div className="inner">
				<div className="image-holder">
					<img src="src/assets/images/productmain2.jpg" alt="" />
				</div>
				<form action="" onSubmit={(e) => { e.preventDefault(); SendApiData(); }} className='flex-center'>
					<h3 className="wantedtext">Good Skin Needs Time</h3>
					<div className="form-wrapper">
						<input 
							type="text" 
							placeholder="UserName" 
							className="form-control" 
							required 
							onChange={(event) => setusername(event.target.value)} 
						/>
						
					</div>
				
					
					<div className="form-wrapper">
						<input 
							type="text" 
							placeholder="Password" 
							className="form-control" 
							required 
							onChange={(event) => setpassword(event.target.value)} 
						/>
                        <i className="zmdi zmdi-lock"></i>
						
					</div>
					
					
					<button type="submit">Login
						<i className="zmdi zmdi-arrow-right"></i>
					</button>
                    <div className="form-wrapper link">
					<a href="/Welcome">
					New?
					</a>
                    
					</div>
                    <GoogleLoginButton></GoogleLoginButton>
				</form>
			</div>
         
		</div>
     
        <Popup show={showwelcomemessage} onClose={()=>navigate("/")} label='Successfully Register' message={`Off 10% on new order ${username}`} ></Popup>
        </div>
     
    );
}