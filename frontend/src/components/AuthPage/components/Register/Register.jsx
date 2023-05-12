import {useState} from 'react';
import {Form, Button, Fade} from 'react-bootstrap';
import classNames from 'classnames';
import {loader} from 'graphql.macro';
import {useMutation} from '@apollo/client';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';

import styles from './Register.module.css';
import {useAuth} from '../../../../foundation';
const CREATE_USER = loader('./graphql/createUser.graphql');

export const Register = ({isNewUser, setIsNewUser}) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
  });
  const [, setCookie] = useCookies(['token']);
  const {setIsAuthenticated} = useAuth();
  const navigate = useNavigate();

  //createUser mutation
  const [createUser] = useMutation(CREATE_USER, {
    variables: {
      input: {
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password,
        dateOfBirth: userDetails.dateOfBirth,
      },
    },
    onCompleted: (data) => {
      setIsAuthenticated(true);
      setCookie('token', data.createUser.token, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
      navigate('/');
    },
    onError: (error) => {
      console.log(error);
      console.log(error.networkError.result.errors[0].message);
    },
  });

  function handleInputChange(event) {
    const {name, value} = event.target;

    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await createUser();
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
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter Name"
                value={userDetails.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={userDetails.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={userDetails.password}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerDate">
              <Form.Label>Date of birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={userDetails.dateOfBirth}
                onChange={handleInputChange}
                max={new Date().toISOString().slice(0, 10)}
              />
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
