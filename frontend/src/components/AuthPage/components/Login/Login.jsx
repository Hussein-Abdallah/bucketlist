import {useState, useRef} from 'react';
import {Button, Fade} from 'react-bootstrap';
import classNames from 'classnames';
import {useLazyQuery} from '@apollo/client';
import {useCookies} from 'react-cookie';
import {loader} from 'graphql.macro';
import {useNavigate} from 'react-router-dom';

import styles from './Login.module.css';
import {useAuth} from '../../../../foundation';
import {AppForm, FormField, SubmitButton} from '../../../Shared';
import {validationSchema} from './utilities';

const LoginUser = loader('./graphql/login.graphql');

export const Login = ({isNewUser, setIsNewUser}) => {
  const formikRef = useRef();
  const [error, setError] = useState(null);
  const [, setCookie] = useCookies(['token']);
  const {setIsAuthenticated} = useAuth();
  const navigate = useNavigate();

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

  async function handleSubmit({email, password}) {
    setError(null);
    const {error} = await loginUser({
      variables: {
        email,
        password,
      },
    });

    //TODO : handle graphql errors
    setError(error);
  }

  const navigateToRegister = () => {
    console.log('formikRef', formikRef);
    formikRef.current?.resetForm();
    setIsNewUser(true);
  };

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
        <div className="mb-3">
          <AppForm
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            innerRef={formikRef}
          >
            <FormField
              name="email"
              label="Email"
              type="email"
              placeholder="Enter email"
            />
            <FormField
              name="password"
              label="Password"
              type="password"
              placeholder="Enter password"
            />
            <SubmitButton
              title="Login"
              className="w-100 mt-3"
              variant="primary"
              type="submit"
            />
          </AppForm>
          {/* Replace with a toast for server errors */}
          {error && (
            <div className="d-flex justify-content-center align-items-center mt-3">
              <p className="text-center text-danger mb-0">
                {error && error.networkError.result.errors[0].message}
              </p>
            </div>
          )}
        </div>
        <div>
          <p className="d-flex align-items-center justify-content-center w-100">
            Don't have an account?
            <Button
              className="fw-semibold"
              type="button"
              variant="link"
              onClick={navigateToRegister}
            >
              Register
            </Button>
          </p>
        </div>
      </div>
    </Fade>
  );
};
