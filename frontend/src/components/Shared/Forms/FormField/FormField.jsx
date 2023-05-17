import {useFormikContext} from 'formik';
import {Form} from 'react-bootstrap';

export function FormField({label, name, ...otherProps}) {
  const {setFieldValue, setFieldTouched, errors, touched, values} =
    useFormikContext();
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          value={values[name]}
          onChange={(evt) => setFieldValue(name, evt.target.value)}
          onBlur={() => setFieldTouched(name)}
          {...otherProps}
        />
        {errors[name] && touched[name] && (
          <small className="text-danger">{errors[name]}</small>
        )}
      </Form.Group>
    </>
  );
}
