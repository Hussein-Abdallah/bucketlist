import {useState, useRef} from 'react';
import {Button, Fade} from 'react-bootstrap';
import classNames from 'classnames';
import {useLazyQuery} from '@apollo/client';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';

import styles from './Login.module.css';
import {useAuth} from 'foundation';
import {AppForm, FormField, SubmitButton} from 'components/Shared';
import {validationSchema} from './utilities';
import {LOGIN_USER} from './graphql/Login';

export const Login = ({isNewUser, setIsNewUser}) => {
  const [error, setError] = useState(null);
  const [, setCookie] = useCookies(['token']);
  const {setIsAuthenticated} = useAuth();
  const navigate = useNavigate();
  const formikRef = useRef();

  const [loginUser] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      setIsAuthenticated(true);
      setCookie('token', data.login.token, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        sameSite: 'none',
        secure: true,
      });
      navigate('/');
    },
    onError: (error) => setError(error),
  });

  async function handleSubmit({email, password}) {
    setError(null);
    await loginUser({
      variables: {
        email,
        password,
      },
    });
  }

  function navigateToRegister() {
    setError(null);
    formikRef.current?.resetForm();
    setIsNewUser(true);
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
