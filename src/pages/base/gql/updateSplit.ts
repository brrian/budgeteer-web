import { gql } from 'apollo-boost';

export const UPDATE_SPLIT = gql`
  mutation updateSplit(
    $categoryId: Int
    $disabled: Boolean
    $id: String!
    $note: String
  ) {
    updateSplit(
      categoryId: $categoryId
      disabled: $disabled
      id: $id
      note: $note
    ) {
      disabled
    }
  }
`;
