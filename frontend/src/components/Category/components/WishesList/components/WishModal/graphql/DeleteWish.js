import {gql} from '@apollo/client';

export const DELETE_WISH = gql`
  mutation DeleteWish($id: ID!) {
    deleteWish(id: $id) {
      id
    }
  }
`;
