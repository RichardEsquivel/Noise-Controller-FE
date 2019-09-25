import React, { useState } from 'react';
import axios from 'axios';



const Login = ({ history }) => {
	//Login will take in props and creds initial value will be a blank string and password setCreds will be utilized with a handleChange
	const [creds, setCreds] = useState({ username: "", password: "" });

	const handleChange = e => {
		// [] allows us to access event.target.name expression to access name
		setCreds({ ...creds, [e.target.name]: e.target.value })

	}
	// preventDefault will keep page from reloading upon submittal will send credentials object from forms which holds that value from user input
	const handleSubmit = event => {
		event.preventDefault();
		axios.post('https://noisecontroller.herokuapp.com/api/auth/login', creds)
			//Code 200 Success
			.then(response => {
				console.log(response);
				//place token defined here in server.js into local storage from response this will allow us to access the value of the token in other components from localStorage
				localStorage.setItem('token', response.data.token);
				//upon success we want to send user to another page that they were trying to access 
				history.push("/creatures");

			})
			.catch(error => console.log(error.response));

	}

	return (
		//handleChange will take user value when and place into spread array of creds and add that new value to the array for username and password handleSubmit will call axios.post upon submittal and push to server api/login
		<div className="login-styles">
			<h1>Welcome to Noise Controller!</h1>

			<form onSubmit={handleSubmit}>
				<input type="text" name="username" placeholder="username" onChange={handleChange} value={creds.username} />
				<input type="password" name="password" placeholder="password" onChange={handleChange} value={creds.password} />
				<button type="submit"> Log in when ready!</button>
			</form>
			<button className="signup-btn" onClick={() => history.push("/signup")}> SignUp!</button>


		</div>

	)
};

export default Login;