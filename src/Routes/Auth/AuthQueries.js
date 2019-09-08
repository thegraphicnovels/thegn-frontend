import { gql } from "apollo-boost";

export const LOGIN_USER = gql`
  mutation loginUser($id: String!, $password: String!) {
    loginUser(id: $id, password: $password)
  }
`;

export const CREATE_USER = gql`
  mutation createUser($name: String!, $id: String!, $password: String!) {
    createUser(name: $name, id: $id, password: $password)
  }
`;

export const LOCAL_LOG_IN = gql`
  mutation onLogin($token: String!) {
    onLogin(token: $token) @client
  }
`;
