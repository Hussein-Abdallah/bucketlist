import {gql} from '@apollo/client';

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    removeCategory(id: $id) {
      title
    }
  }
`;
