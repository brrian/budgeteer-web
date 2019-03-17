import { gql } from 'apollo-boost';

export const UPDATE_TRANSACTION = gql`
  mutation updateTransaction(
    $categoryId: Int
    $description: String
    $disabled: Boolean
    $id: String!
    $note: String
  ) {
    updateTransaction(
      categoryId: $categoryId
      description: $description
      disabled: $disabled
      id: $id
      note: $note
    ) {
      disabled
    }
  }
`;
