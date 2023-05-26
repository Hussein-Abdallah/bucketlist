import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
  query LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;
