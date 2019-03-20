import { gql } from 'apollo-boost';

export const GET_USER_DATA = gql`
  query UserData($date: String!) {
    budget(date: $date) {
      total
      categories
    }
    categories
    stash {
      total
    }
    transactions(date: $date) {
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
  }
`;
