import { UserService } from "./user.service";

export class PostService {

    static async feed() {
        const res = await fetch ('http://localhost:4000/post', {
            headers: {
                Authorization: UserService.getToken()
            }
        });
        return await res.json();
    }
}