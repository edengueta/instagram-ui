import * as yup from 'yup';
export const postCreateSchema = yup.object().shape({
    image: yup.mixed()
        .required("You must select a photo"),
    caption: yup.string()
        .max(100, "That's enough")
});