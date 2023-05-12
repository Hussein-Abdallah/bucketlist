import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().email().required().label('Email'),
  password: Yup.string()
    .min(6, 'Must be at least 6 characters')
    .required()
    .label('Password'),
  dateOfBirth: Yup.string().required().label('Date of Birth'),
});
