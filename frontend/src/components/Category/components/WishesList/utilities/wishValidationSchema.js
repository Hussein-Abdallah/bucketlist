import * as Yup from 'yup';

export const wishValidationSchema = Yup.object().shape({
  title: Yup.string().required().max(50).label('Title'),
  description: Yup.string().max(250).notRequired().label('Description'),
  location: Yup.string().max(150).notRequired().label('Location'),
  timeline: Yup.date().notRequired().label('Timeline'),
  cost: Yup.number().notRequired().label('Cost'),
});
