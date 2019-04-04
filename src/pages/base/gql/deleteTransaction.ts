import { gql } from 'apollo-boost';

export const DELETE_TRANSACTION = gql`
  mutation deleteTransaction($id: String!) {
    deleteTransaction(id: $id)
  }
`;
