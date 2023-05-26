import {gql} from '@apollo/client';

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $input: CategoryUpdateInput!) {
    updateCategory(id: $id, input: $input) {
      id
      title
      description
      image
    }
  }
`;
