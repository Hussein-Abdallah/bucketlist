import {gql} from '@apollo/client';

export const GET_CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      id
      title
      description
      image
      totalWishes
      completedWishes
    }
  }
`;
