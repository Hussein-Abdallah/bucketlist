import {Formik} from 'formik';

export function AppForm({
  initialValues,
  onSubmit,
  validationSchema,
  innerRef,
  children,
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      innerRef={innerRef}
    >
      {() => <>{children}</>}
    </Formik>
  );
}
