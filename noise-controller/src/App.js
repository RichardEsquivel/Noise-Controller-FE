import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import SignUp from "./Components/SignUp";


function App() {
	return (
		<div>
			hello World
	  <Route exact path="/login" component={SignUp} />


		</div>
	);
}

export default App;
