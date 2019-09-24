import { gql } from "apollo-boost";

export const DEATIL_PORTPOLIO = gql`
  query detailPortpolio($id: String!) {
    detailPortpolio(id: $id) {
      _id
      title
      description
      user {
        _id
        name
      }
      files {
        _id
        url
      }
      createAt
      updateAt
    }
  }
`;

export const MODIFY_PORTPOLIO = gql`
  mutation modifyPortpolio(
    $id: String!
    $title: String!
    $description: String
  ) {
    modifyPortpolio(id: $id, title: $title, description: $description)
  }
`;
