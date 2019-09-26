import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "./Components/Header";
import Creatures from "./Components/Creatures";
import Settings from "./Components/Settings";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import "./App.css";

const ProtectedRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => {
				if (localStorage.getItem("token")) {
					return <Component {...props} />;
				} else {
					return <Redirect to="/login" />;
				}
			}}
		/>
	);
};
function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	return (
		<div>
			<Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
			<Route
				path="/login"
				render={props => <Login {...props} setLoggedIn={setLoggedIn} />}
			/>
			<Route path="/creatures" component={Creatures} />
			{/* 
          Build a PrivateRoute component that will 
          display Settings when you're authenticated 
		*/}
			<ProtectedRoute path="/settings" component={Settings} />
			<Route path="/signup" component={SignUp} />
		</div>
	);
}

export default App;
