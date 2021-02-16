import Cookies from 'js-cookie';

export class UserService {

	static getToken() {
		return Cookies.get('insta-user');
	}

	static async me() {
		const res= await fetch('http://localhost:4000/user/me', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
                 Authorization: UserService.getToken(),
			},
		});
			if (res.status !== 200) {
				return null;
			}
			return res.json();
	}

	static async create(data) {
		return await fetch('http://localhost:4000/user', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
	}

	static async login(credentials) {
		return await fetch('http://localhost:4000/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		});
	}
}