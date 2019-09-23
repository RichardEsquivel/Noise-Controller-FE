import axios from 'axios';


//this function will create an axios request and set an Authorization header that will retrieve the token out of local storage. This will allow us to use this when needed
const axiosWithAuth = () => {
	return axios.create({
		headers: {
			Authorization: localStorage.getItem('token')
		}
	})
}

export default axiosWithAuth;
