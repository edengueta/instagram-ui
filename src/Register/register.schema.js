import * as yup from 'yup';
export const registerSchema = yup.object().shape({
    username: yup.string()
        .min(3, 'Make it more then 3 characters')
        .max(14,'Make it less then 14 characters')
        .required(`It's required`),
    password: yup.string()
        .min(3, 'Make it more then 3 characters')
        .max(60)
        .required(`It's required`),
    email: yup.string()
        .max(50)
        .email(`It's not a valid email`)
        .required(`It's required`),
    // agreeToTerms: yup.boolean().oneOf([true], "You must agree to terms")
});