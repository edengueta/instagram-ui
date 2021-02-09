import * as yup from 'yup';
export const registerSchema = yup.object().shape({
    username: yup.string()
        .min(3, 'Make it more then 3 characters')
        .max(14,'Make it less then 14 characters')
        .required(`It's required`)
        .test('checkUsernameUnique', 'This username is already taken.',
            async function(value) {
                const response = await fetch(`http://localhost:4000/user/validateusername/${value}`);
                const result = await response.json();
                return result
            }
    ),
    password: yup.string()
        .min(3, 'Make it more then 3 characters')
        .max(60)
        .required(`It's required`),
    email: yup.string()
        .max(50)
        .email(`It's not a valid email`)
        .required(`It's required`)
        .test('checkEmailUnique', 'This email is already registered.',
            async function(value) {
                const response = await fetch(`http://localhost:4000/user/validatemail/${value}`);
                const result = await response.json();
                return result
            }
        )        
});