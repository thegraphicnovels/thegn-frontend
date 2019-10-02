import { gql } from "apollo-boost";

export const UPLOAD_PORTPOLIO = gql`
  mutation uploadPortpolio(
    $title: String!
    $description: String
    $fileUrl: [String]
    $tags: [String]
  ) {
    uploadPortpolio(
      title: $title
      description: $description
      fileUrl: $fileUrl
      tags: $tags
    ) {
      _id
    }
  }
`;

export const MODIFY_PORTPOLIO = gql`
  mutation modifyPortpolio(
    $id: String!
    $title: String!
    $description: String
    $tags: [String]
  ) {
    modifyPortpolio(
      id: $id
      title: $title
      description: $description
      tags: $tags
    )
  }
`;
