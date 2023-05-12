import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string()
    .min(6, 'Must be at least 6 characters')
    .required()
    .label('Password'),
});
