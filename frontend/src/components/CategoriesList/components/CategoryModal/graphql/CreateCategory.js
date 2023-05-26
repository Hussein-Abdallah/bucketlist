import {gql} from '@apollo/client';

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CategoryInput!) {
    addCategory(input: $input) {
      id
      title
      description
      image
    }
  }
`;
