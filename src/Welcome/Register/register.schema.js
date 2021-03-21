import * as yup from 'yup';
import environment from '../../environments/index';


export const registerSchema = yup.object().shape({
    username: yup.string()
        .min(3, 'Make it more then 3 characters')
        .max(14,'Make it less then 14 characters')
        .required(`It's required`)
        .test('isUnique', 'Username is already taken', (value) => isUnique('username', value)),

    password: yup.string()
        .min(3, 'Make it more then 3 characters')
        .max(60)
        .required(`It's required`),
        
    email: yup.string()
        .max(50)
        .email(`Email is invalid`)
        .required(`It's required`)
        .test('isUnique', 'This email is already registered.', (value) => isUnique('email', value)),
                
});

const memo = {
	email: {},
	username: {}
};

async function isUnique(field, value) {

    if (memo[field].hasOwnProperty(value)) {
		return memo[field][value];
	}

    const res = await fetch(environment.apiUrl +"/user/check?"+ field +"="+value);;
    const json = await res.json();
    memo[field][value] = !json;
    return memo[field][value];

}