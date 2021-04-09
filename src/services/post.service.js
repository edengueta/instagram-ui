import { UserService } from "./user.service";
import environment from '../environments/index';

export class PostService {

    static async feed() {
        const res = await fetch (environment.apiUrl + '/post?sort=-1', {
            headers: {
                Authorization: UserService.getToken()
            }
        });
        return await res.json();
    }

    static async get(id) {
        const res = await fetch (environment.apiUrl + '/post/' + id, {
            headers: {
                Authorization: UserService.getToken()
            }
        });
        return res.json();
    }

    static async isLiked(postId,userId) {
        const res = await fetch (environment.apiUrl + '/post/'+ postId +'/likes/' + userId, {
			headers: {
                 Authorization: UserService.getToken(),
			},
		});
        return res.json();
    }

    static async like(postId,userId) {
        const res = await fetch (environment.apiUrl + '/post/'+ postId +'/likes', {
            method: 'POST',
			headers: {
				'Content-Type': 'application/json',
                 Authorization: UserService.getToken(),
			},
            body: JSON.stringify({
                userId
            }),
		});
        return res.json();
    }
    static async unlike(postId,userId) {
        const res = await fetch (environment.apiUrl + '/post/'+ postId +'/likes/' + userId, {
            method: 'DELETE',
			headers: {
                 Authorization: UserService.getToken(),
			},
		});
        return res.json();
    }

    static async createComment(postId,content) {
        const res = await fetch (environment.apiUrl + '/post/'+ postId +'/comment', {
            method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
                 Authorization: UserService.getToken(),
			},
            body: JSON.stringify({
                content
            }),
		});
        return res.json();
    }
    
    static async getComments(postId) {
        const res = await fetch (environment.apiUrl + '/post/'+ postId +'/comment', {
            headers: {
                Authorization: UserService.getToken()
            }
        });
        return res.json();
    }

}