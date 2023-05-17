import * as Yup from 'yup';

export const categoryValidationSchema = Yup.object().shape({
  title: Yup.string().required().max(50).label('Title'),
  description: Yup.string().max(150).required().label('Description'),
});
