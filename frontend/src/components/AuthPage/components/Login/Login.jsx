import {useRef} from 'react';
import {Form, Button, Fade} from 'react-bootstrap';
import classNames from 'classnames';
import {useLazyQuery} from '@apollo/client';
import {useCookies} from 'react-cookie';
import {loader} from 'graphql.macro';
import {useNavigate} from 'react-router-dom';

import styles from './Login.module.css';
import {useAuth} from '../../../../foundation';
const LoginUser = loader('./graphql/login.graphql');

export const Login = ({isNewUser, setIsNewUser}) => {
  const [, setCookie] = useCookies(['token']);
  const {setIsAuthenticated} = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [loginUser] = useLazyQuery(LoginUser, {
    onCompleted: (data) => {
      setIsAuthenticated(true);
      setCookie('token', data.login.token, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
      navigate('/');
    },
    onError: (error) => console.log(error.networkError.result.errors),
  });

  function handleSubmit(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    loginUser({
      variables: {
        email,
        password,
      },
    });

    //TODO : handle graphql errors

    emailRef.current.value = '';
    passwordRef.current.value = '';

    return;
  }

  return (
    <Fade in={!isNewUser} timeout={5000} appear>
      <div
        className={classNames(
          'text-white p-5 rounded-4 bg-gradient shadow-lg',
          styles.Container,
          isNewUser && 'd-none',
        )}
      >
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-semibold leading-tight">
            Bucket List App
          </h1>
        </div>
        <div className="mb-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                ref={emailRef}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={passwordRef}
                type="password"
                placeholder="Enter password"
              />
            </Form.Group>

            <Button className="w-100 mt-3" variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
        <div>
          <p className="d-flex align-items-center justify-content-center w-100">
            Don't have an account?
            <Button
              className="fw-semibold"
              type="button"
              variant="link"
              onClick={() => setIsNewUser(true)}
            >
              Register
            </Button>
          </p>
        </div>
      </div>
    </Fade>
  );
};
