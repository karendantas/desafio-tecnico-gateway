import { gql } from "@apollo/client";
export const GET_USER = gql`
  query me {
    id
    name
    email
  }
`;

export const GET_ENTERPRISES = gql`
  query getEnterprises($filter: EnterpriseFilter) {
    enterprises(filter: $filter) {
      id
      name
      listingType
      price
      gallery
      user {
        id
        name
      }
    }
  }
`;
