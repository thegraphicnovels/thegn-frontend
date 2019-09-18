import { gql } from "apollo-boost";

export const SEE_PORTPOLIOS = gql`
  query seePortpolios($page: Int!, $limit: Int!) {
    seePortpolios(page: $page, limit: $limit) {
      portpolios {
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
      }
      totalPages
    }
  }
`;
