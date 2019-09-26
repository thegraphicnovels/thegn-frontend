import { gql } from "apollo-boost";

export const SEE_TAGS = gql`
  {
    seeTags {
      _id
      value
      user {
        name
      }
      updateAt
    }
  }
`;

export const CREATE_TAG = gql`
  mutation createTag($tag: String!) {
    createTag(tag: $tag)
  }
`;

export const MODIFY_TAG = gql`
  mutation modifyTag($id: String!, $value: String!) {
    modifyTag(id: $id, value: $value)
  }
`;

export const DELETE_TAG = gql`
  mutation deleteTag($id: String!) {
    deleteTag(id: $id)
  }
`;
