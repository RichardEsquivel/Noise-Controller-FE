import React from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "./Components/Header";
import Creatures from "./Components/Creatures";
import Settings from "./Components/Settings";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp.js"

const ProtectedRoute = ({ component: Component, ...rest }) => {
	return <Route {...rest} render={props => {
		if (localStorage.getItem('token')) {
			return <Component {...props} />;
		} else {
			return <Redirect to="/login" />;
		}
	}} />;
}
function App() {


	return (
		<div>
			<Header />
			<Route path="/login" component={Login} />
			<Route path="/creatures" component={Creatures} />
			{/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
		*/}
			<ProtectedRoute path="/settings" component={Settings} />
			<Route path="/signup" component={SignUp} />

		</div>
	);

}

export default App;
