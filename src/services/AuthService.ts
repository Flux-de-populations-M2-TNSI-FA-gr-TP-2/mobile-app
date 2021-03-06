import decode from 'jwt-decode';

export default class AuthService {
	private domain: string;

	// Initializing important variables
	constructor() {
		this.domain =  'https://fluxtnsi.ddns.net/api/user' // API server domain
		this.fetch = this.fetch.bind(this) // React binding stuff
		this.login = this.login.bind(this)
		this.getProfile = this.getProfile.bind(this)
	}

	login(username: string, password: string) {
		// Get a token from api server using the fetch api
		return this.fetch(`${this.domain}/login`, {
			method: 'POST',
			body: JSON.stringify({
				email: username,
				password: password
			})
		}).then(res => {
			// console.log("Résultat authentification : ");
			// console.log(res);
			// console.log("Token");
			// console.log(res.access_token);
			this.setToken(res.access_token); // Setting the token in localStorage
			return Promise.resolve(res);
		})
	}

	loggedIn() {
		// Checks if there is a saved token and it's still valid
		const token = this.getToken() // GEtting token from localstorage
		return !!token && !this.isTokenExpired(token) // handwaiving here
	}

	isTokenExpired(token: any) {

		try {
			const decoded = decode(token);
			// @ts-ignore
			if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
				return true;
			}
			else
				return false;
		}
		catch (err) {
			return false;
		}
	}

	setToken(idToken: any) {
		// Saves user token to localStorage
		localStorage.setItem('id_token', idToken)
	}

	getToken() {
		// Retrieves the user token from localStorage
		return localStorage.getItem('id_token')
	}

	logout() {
		// Clear user token and profile data from localStorage
		localStorage.removeItem('id_token');
	}

	getProfile() {
		// Using jwt-decode npm package to decode the token
		// @ts-ignore
		return decode(this.getToken());
	}


	fetch(url: string, options: any) {
		// performs api calls sending the required authentication headers
		const headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}

		// Setting Authorization header
		// Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
		if (this.loggedIn()) {
			// @ts-ignore
			headers['Authorization'] = 'Bearer ' + this.getToken()
		}

		return fetch(url, {
			headers,
			...options
		})
			.then(this._checkStatus)
			.then(response => response.json())
	}

	_checkStatus(response: any) {
		// raises an error in case response status is not a success
		if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
			return response
		} else {
			var error = new Error(response.statusText)
			// @ts-ignore
			error.response = response
			throw error
		}
	}
}
