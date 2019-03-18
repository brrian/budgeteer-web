import { gql } from 'apollo-boost';

export const SPLIT_TRANSACTION = gql`
  mutation splitTransaction(
    $amount: Float!
    $categoryId: Int!
    $transactionId: String!
    $note: String
  ) {
    splitTransaction(
      amount: $amount
      categoryId: $categoryId
      note: $note
      transactionId: $transactionId
    ) {
      amount
      categoryId
      disabled
      id
      note
    }
  }
`;
