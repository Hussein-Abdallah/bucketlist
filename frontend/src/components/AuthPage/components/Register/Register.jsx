import {useState, useRef} from 'react';
import {Button, Fade} from 'react-bootstrap';
import classNames from 'classnames';
import {useMutation} from '@apollo/client';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';

import styles from './Register.module.css';

import {useAuth} from 'foundation';
import {AppForm, FormField, SubmitButton} from 'components/Shared';
import {validationSchema} from './utilities';
import {CREATE_USER} from './graphql/CreateUser';

export const Register = ({isNewUser, setIsNewUser}) => {
  const [error, setError] = useState(null);
  const [, setCookie] = useCookies(['token']);
  const {setIsAuthenticated} = useAuth();
  const navigate = useNavigate();
  const registerFormikRef = useRef();

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      setIsAuthenticated(true);
      setCookie('token', data.createUser.token, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        sameSite: 'none',
        secure: true,
      });
      navigate('/');
    },
    onError: (error) => {
      setError(error);
    },
  });

  async function handleSubmit({name, email, password, dateOfBirth}) {
    await createUser({
      variables: {
        input: {
          name: name,
          email: email,
          password: password,
          dateOfBirth: dateOfBirth,
        },
      },
    });
  }

  function navigateToLogin() {
    setError(null);
    registerFormikRef.current.resetForm();
    setIsNewUser(false);
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
          <AppForm
            initialValues={{
              name: '',
              email: '',
              password: '',
              dateOfBirth: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            innerRef={registerFormikRef}
          >
            <FormField
              name="name"
              type="text"
              placeholder="Enter Name"
              label="Name"
            />
            <FormField
              name="email"
              type="email"
              placeholder="Enter email"
              label="Email"
            />
            <FormField
              name="password"
              type="password"
              placeholder="Enter password"
              label="Password"
            />
            <FormField
              name="dateOfBirth"
              type="date"
              placeholder="Enter date of birth"
              label="Date of Birth"
              max={new Date().toISOString().slice(0, 10)}
            />
            <SubmitButton
              className="w-100 mt-3"
              variant="primary"
              title="Register"
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
            Already have an account!
            <Button
              className="fw-semibold"
              type="button"
              variant="link"
              onClick={navigateToLogin}
            >
              Sign In
            </Button>
          </p>
        </div>
      </div>
    </Fade>
  );
};
