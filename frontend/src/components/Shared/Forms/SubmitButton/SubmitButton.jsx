import {useFormikContext} from 'formik';
import {Button, Spinner} from 'react-bootstrap';
export function SubmitButton({
  title,
  className,
  variant,
  spinner,
  disabled,
  type,
}) {
  const {handleSubmit} = useFormikContext();

  return (
    <Button
      onClick={handleSubmit}
      className={className}
      variant={variant}
      disabled={disabled}
    >
      {spinner && (
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      )}{' '}
      {title}
    </Button>
  );
}
