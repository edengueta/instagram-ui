import * as yup from 'yup';
export const uploadAvatarSchema = yup.object().shape({
    image: yup.mixed()
        .required("You must select a photo")
});