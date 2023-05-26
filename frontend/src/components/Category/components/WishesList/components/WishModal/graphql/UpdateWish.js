import {gql} from '@apollo/client';

export const UPDATE_WISH = gql`
  mutation UpdateWish($id: ID!, $input: WishUpdateInput!) {
    updateWish(id: $id, input: $input) {
      id
      title
    }
  }
`;
