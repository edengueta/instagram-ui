import Cookies from 'js-cookie';
import environment from '../environments/index';

export class UserService {

	static getToken() {
		return Cookies.get('insta-user');
	}

	static async me() {
		const res= await fetch(environment.apiUrl + '/user/me', {
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
		return await fetch(environment.apiUrl + '/user', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
	}

	static async login(credentials) {
		return await fetch(environment.apiUrl + '/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		});
	}

	static async get(username) {
		const res = await fetch(environment.apiUrl + '/user/' + username , {
			headers: {
                 Authorization: UserService.getToken(),
			},
		});
		return res.json();
	}

	static async getPosts(username) {
		const res = await fetch(environment.apiUrl + '/user/' + username+ '/posts' , {
			headers: {
                 Authorization: UserService.getToken(),
			},
		});
		return res.json();
	}

	static async search(username) {
		const res = await fetch(environment.apiUrl + '/user/?username=' + username , {
			headers: {
                 Authorization: UserService.getToken(),
			},
		});
		return res.json();
	}
	
	static async follow(userId){
		const res = await fetch (environment.apiUrl + '/user/'+ userId +'/follow', {
            method: 'POST',
			headers: {
                 Authorization: UserService.getToken(),
			}
		});
		return res.json();
	}

	static async unfollow(userId){
		const res = await fetch (environment.apiUrl + '/user/'+ userId +'/unfollow', {
            method: 'POST',
			headers: {
                 Authorization: UserService.getToken(),
			}
		});
		return res.json();
	}

	static async removeAvatar(){
		const res = await fetch (environment.apiUrl + '/user/avatar/remove', {
            method: 'POST',
			headers: {
                 Authorization: UserService.getToken(),
			}
		});
		return res.json();
	}


	
}