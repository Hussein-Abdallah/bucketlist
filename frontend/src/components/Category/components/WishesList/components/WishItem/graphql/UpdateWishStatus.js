import {gql} from '@apollo/client';

export const UPDATE_WISH_STATUS = gql`
  mutation UpdateWishStatus($id: ID!, $input: WishUpdateInput!) {
    updateWish(id: $id, input: $input) {
      id
      status
    }
  }
`;
