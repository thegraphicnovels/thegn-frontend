import { gql } from 'apollo-boost';

export const tagQuery = gql`
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

export const tagCreateQuery = gql`
  mutation createTag($tag: String!) {
    createTag(tag: $tag)
  }
`;

export const tagModifyQuery = gql`
  mutation modifyTag($id: String!, $value: String!) {
    modifyTag(id: $id, value: $value)
  }
`;

export const tagDeleteQuery = gql`
  mutation deleteTag($id: String!) {
    deleteTag(id: $id)
  }
`;
