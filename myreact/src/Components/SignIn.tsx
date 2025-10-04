import { use, useState } from "react";
import "../assets/Signin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
type Gender = "male" | "female" | "other";
export default function SignIn(){

	const[firstname,setfirstname]=useState<string>();
	const[lastname,setlastname]=useState<string>();
	const[birthdate,setbirthdate]=useState<string>();
	const[email,setemail]=useState<string>();
	const[password,setpassword]=useState<string>();
	const[gender,setgender]=useState<Gender>();
	const[username,setusername]=useState<string>();
	const[showwelcomemessage,setshow]=useState<boolean>(false);
	const navigate=useNavigate();
	const data = {
		firstname: firstname || "",
		lastname: lastname || "",
		birthdate: birthdate || "",
		
		password: password || "",
		gender: gender|| "",
		username: username || ""
	};

	const handleDateChange = (e: { target: { value: string | number | Date; }; }) => {
        const selectedDate = new Date(e.target.value); // Convert input to Date object
        const formattedDate = selectedDate.toISOString().split("T")[0]; // Convert to "YYYY-MM-DD"
        setbirthdate(formattedDate);
      };
	const SendApiData = async () => {
		const api = 'http://localhost:5237/api/User/SignUp';
		if (!firstname || !lastname || !email || !password || !gender || !birthdate || !username) {
			alert("Invalid input");
			return;
		}
		console.log(data);
		
		try {
			const response = await axios.post(api, JSON.stringify(data), {
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			});
			alert(response.data.message);
			if(response.status === 200){
				setshow(true);
				navigate("/")
				localStorage.setItem("username", username);
				localStorage.setItem("fullname",firstname+" "+lastname);
				localStorage.setItem("UserId",response.data.userId);
				localStorage.setItem("email",email);
			}
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				// Handle structured error response
				if (error.response.data.errors) {
					alert(`Registration failed:\n${error.response.data.errors.join('\n')}`);
				} else {
					alert(error.response.data.toString() || "Registration failed");
					console.log(error.response.data);

				}
			} else {
				alert("An unknown error occurred");
			}
		}
	};

   return(
    <div className="sign">
<div className="wrapper" style={{ backgroundImage: "url('images/bg-registration-form-1.jpg')" }}>
			<div className="inner">
				<div className="image-holder">
					<img src="src/assets/images/productmain2.jpg" alt="" />
				</div>
				<form action="" onSubmit={(e) => { e.preventDefault(); SendApiData(); }}>
					<h3>Registration Form</h3>
					<div className="form-group">
						<input 
							type="text" 
							placeholder="First Name" 
							className="form-control" 
							required 
							onChange={(event) => setfirstname(event.target.value)} 
						/>
						<input 
							type="text" 
							placeholder="Last Name" 
							className="form-control" 
							required 
							onChange={(event) => setlastname(event.target.value)} 
						/>
					</div>
					<div className="form-wrapper">
						<input 
							type="text" 
							placeholder="Email Address" 
							className="form-control" 
							required 
							onChange={(event) => setemail(event.target.value)} 
						/>
						<i className="zmdi zmdi-email"></i>
					</div>
					<div className="form-wrapper">
						<select 
							name="gender" 
							id="gender" 
							className="form-control" 
							required 
							onChange={(event) => setgender(event.target.value as Gender)}
						>
							<option value="" disabled selected>Gender</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">Other</option>
						</select>
						<i className="zmdi zmdi-caret-down" style={{ fontSize: "17px" }}></i>
					</div>
					<div className="form-wrapper">
						<input 
							type="password" 
							placeholder="Password" 
							className="form-control" 
							required 
							onChange={(event) => setpassword(event.target.value)} 
							minLength={10}
							autoComplete="new-password"
							pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{10,}$"  // Regex pattern for validation
  title="Password must be at least 10 characters long and contain at least one letter and one number"
							
						/>
						<i className="zmdi zmdi-lock"></i>
					</div>
					<div className="form-wrapper">
						<input 
							type="text" 
							placeholder="UserName" 
							className="form-control" 
							required 
							onChange={(event) => setusername(event.target.value)} 
						/>
						<i className="zmdi zmdi-lock"></i>
					</div>
					<div className="form-wrapper">
						<input 
							type="date" 
							placeholder="Birthdate" 
							className="form-control" 
							required 
							onChange={handleDateChange} 
						/>
					</div>
					<button type="submit">Register
						<i className="zmdi zmdi-arrow-right"></i>
					</button>
					<div className="form-wrapper link">
					<a href="/WelcomeOldUser">
					Already has a account
					</a>
					</div>
					
				
				</form>
				<GoogleLogin
  onSuccess={credentialResponse => {
    const token = credentialResponse.credential;
    axios.post('http://localhost:5237/api/Auth/GoogleAuth', { token })
      .then(async response => {
        const { user } = response.data;
		console.log(user);
		console.log('nour here'+user.firstName);
        //alert("Google Login Successful!");
		localStorage.setItem("username", user.firstName);
		setusername(user.firstName);
		
			await setshow(true);
		
		

         // Use correct property name
       
      })
      .catch(error => {
        console.error("Login error:", error.response?.data || error.message);
        alert(error);
      });
  }}
  onError={() => {
    alert("Google Sign-In Failed");
  }}
/>

				 <Popup show={showwelcomemessage} onClose={()=>navigate("/")} label='Successfully Register' message={`Off 10% on new order ${username}`} ></Popup>
			</div>
		</div>
        </div>
		
   );
};