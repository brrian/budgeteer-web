import { gql } from 'apollo-boost';

export const DELETE_SPLIT = gql`
  mutation deleteSplit($id: String!) {
    deleteSplit(id: $id)
  }
`;
