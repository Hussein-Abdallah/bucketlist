import {Form, Button, Fade} from 'react-bootstrap';
import classNames from 'classnames';

import styles from './Register.module.css';

export const Register = ({isNewUser, setIsNewUser}) => {
  function handleSubmit(event) {
    event.preventDefault();

    console.log({
      username: event.target[0].value,
      password: event.target[1].value,
    });
  }
  return (
    <Fade in={isNewUser} timeout={50000} appear>
      <div
        className={classNames(
          'text-white p-5 rounded-4 bg-gradient shadow-lg',
          styles.Container,
          !isNewUser && 'd-none',
        )}
      >
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-semibold leading-tight">
            Bucket List App
          </h1>
        </div>
        <div className="mb-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="registerName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerDate">
              <Form.Label>Date of birth</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Button className="w-100 mt-3" variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>
        <div>
          <p className="d-flex align-items-center justify-content-center w-100">
            Already have an account!
            <Button
              className="fw-semibold"
              type="button"
              variant="link"
              onClick={() => setIsNewUser(false)}
            >
              Sign In
            </Button>
          </p>
        </div>
      </div>
    </Fade>
  );
};
