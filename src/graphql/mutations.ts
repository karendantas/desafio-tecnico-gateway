import { gql } from "@apollo/client";

export const SIGNIN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const CREATE_ENTERPRISE = gql`
  mutation CreateEnterprise($input: EnterpriseInput!) {
    createEnterprise(input: $input) {
      id
      name
      listingType
      price
      gallery
    }
  }
`;

export const UPDATE_ENTERPRISE = gql`
  mutation UpdateEnterprise($id: ID!, $input: EnterpriseInput!) {
    updateEnterprise(id: $id, input: $input) {
      id
      name
      listingType
      price
      gallery
    }
  }
`;

export const DELETE_ENTERPRISE = gql`
  mutation DeleteEnterprise($id: ID!) {
    deleteEnterprise(id: $id) {
      id
    }
  }
`;
