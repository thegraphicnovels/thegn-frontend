import { gql } from "apollo-boost";

export const POST_UPLOAD = gql`
  mutation uploadPost(
    $title: String!
    $description: String! # $files: [String]
  ) {
    uploadPost(
      title: $title
      description: $description # , files: $files
    ) {
      _id
    }
  }
`;

export const POST_UPLOAD_FILE = gql`
  mutation uploadPostFile($postId: String!, $url: String!) {
    uploadPostFile(postId: $postId, url: $url) {
      _id
    }
  }
`;

export const POST_UPDATE = gql`
  mutation updatePost(
    $postId: String!
    $title: String
    $description: String
    $fileId: String
  ) {
    updatePost(
      postId: $postId
      title: $title
      description: $description
      fileId: $fileId
    ) {
      _id
    }
  }
`;
