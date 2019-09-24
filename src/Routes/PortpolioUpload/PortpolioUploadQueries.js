import { gql } from "apollo-boost";

export const UPLOAD_PORTPOLIO = gql`
  mutation uploadPortpolio(
    $title: String!
    $description: String
    $fileUrl: [String]
  ) {
    uploadPortpolio(
      title: $title
      description: $description
      fileUrl: $fileUrl
    ) {
      _id
    }
  }
`;
