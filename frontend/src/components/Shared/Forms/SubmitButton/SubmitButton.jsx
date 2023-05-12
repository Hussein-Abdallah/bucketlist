import {useFormikContext} from 'formik';
import {Button} from 'react-bootstrap';
export function SubmitButton({title, className, variant, type}) {
  const {handleSubmit} = useFormikContext();

  return (
    <Button onClick={handleSubmit} className={className} variant={variant}>
      {title}
    </Button>
  );
}
