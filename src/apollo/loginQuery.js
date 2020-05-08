import { gql } from 'apollo-boost';

export const LOGIN_USER = gql`
  mutation loginUser($id: String!, $password: String!) {
    loginUser(id: $id, password: $password)
  }
`;

export const LOCAL_LOG_IN = gql`
  mutation onLogin($token: String!) {
    onLogin(token: $token) @client
  }
`;

export const LOCAL_LOG_OUT = gql`
  mutation onLogout {
    onLogout @client
  }
`;
