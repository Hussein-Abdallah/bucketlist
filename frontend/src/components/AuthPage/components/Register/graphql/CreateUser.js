import {gql} from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($input: NewUserInput!) {
    createUser(input: $input) {
      token
      userId
      tokenExpiration
    }
  }
`;
