import React from "react";
import { Route } from "react-router-dom";
import Header from "./Components/Header";
import Creatures from "./Components/Creatures";
import Settings from "./Components/Settings";
import SignUp from "./Components/SignUp";

function App() {
	return (
		<div>
			<Header />
			<Route exact path="/" component={Creatures} />
			<Route path="/settings" component={Settings} />
			<Route path="/signup" component={SignUp} />
		</div>
	);

}

export default App;
