import {gql} from '@apollo/client';

export const GET_WISHES = gql`
  query GetWishes($id: ID!) {
    wishes(category: $id) {
      id
      title
      location
      description
      status
      timeline
      cost
    }
  }
`;
