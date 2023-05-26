import {gql} from '@apollo/client';

export const CREATE_WISH = gql`
  mutation CreateWish($input: WishInput!) {
    createWish(input: $input) {
      id
    }
  }
`;
