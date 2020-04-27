import { gql } from 'apollo-boost';

// user list
export const userListQuery = gql`
  {
    seeUsers {
      _id
      id
      name
      createAt
      updateAt
    }
  }
`;

// user detail
export const userDetailQuery = gql`
  query detailUser($id: String!) {
    detailUser(id: $id) {
      _id
      id
      name
      createAt
      updateAt
    }
  }
`;

export const userCreateQuery = gql`
  mutation createUser($id: String!, $password: String!, $name: String!) {
    createUser(id: $id, password: $password, name: $name)
  }
`;

// user modify
export const userModifyQuery = gql`
  mutation modifyUser(
    $id: String!
    $name: String!
    $oPassword: String
    $cPassword: String
  ) {
    modifyUser(
      id: $id
      name: $name
      oPassword: $oPassword
      cPassword: $cPassword
    )
  }
`;

// user delete
export const userDeleteQuery = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id)
  }
`;
