import { gql } from 'apollo-boost';

export const ADD_TRANSACTION = gql`
  mutation addTransaction(
    $amount: Float!
    $categoryId: Int!
    $date: String!
    $description: String!
    $note: String
  ) {
    addTransaction(
      amount: $amount
      categoryId: $categoryId
      date: $date
      description: $description
      note: $note
    ) {
      stashTotal
      transaction {
        amount
        categoryId
        date
        description
        disabled
        id
        note
        splits {
          amount
          categoryId
          disabled
          id
          note
        }
      }
      updatedStash
    }
  }
`;
