import { gql } from 'apollo-boost';

export const archiveQuery = gql`
  query seePortpolios(
    $page: Int
    $limit: Int
    $tags: [String]
    $keyword: String
  ) {
    seePortpolios(page: $page, limit: $limit, tags: $tags, keyword: $keyword) {
      portpolios {
        _id
        title
        description
        thumbImg
        user {
          _id
          name
        }
        files {
          _id
          url
        }
        views
        tags {
          _id
          value
        }
        createAt
        updateAt
      }
      totalPages
      totalPortpolios
    }
  }
`;

export const archiveDetailQuery = gql`
  query detailPortpolio($id: String!) {
    detailPortpolio(id: $id) {
      _id
      title
      description
      user {
        _id
        name
      }
      thumbImg
      files {
        _id
        url
      }
      views
      tags {
        _id
        value
      }
      createAt
      updateAt
    }
  }
`;

export const archiveUploadQuery = gql`
  mutation uploadPortpolio(
    $title: String!
    $description: String
    $thumbFileUrl: String
    $fileUrl: [String]
    $tags: [String]
  ) {
    uploadPortpolio(
      title: $title
      description: $description
      thumbFileUrl: $thumbFileUrl
      fileUrl: $fileUrl
      tags: $tags
    ) {
      _id
    }
  }
`;

export const archiveModifyQuery = gql`
  mutation modifyPortpolio(
    $id: String!
    $title: String!
    $description: String
    $thumbFileUrl: String
    $fileUrl: [String]
    $tags: [String]
  ) {
    modifyPortpolio(
      id: $id
      title: $title
      description: $description
      thumbFileUrl: $thumbFileUrl
      fileUrl: $fileUrl
      tags: $tags
    )
  }
`;

export const archiveDeleteQuery = gql`
  mutation deletePortpolio($id: String!) {
    deletePortpolio(id: $id)
  }
`;

export const archiveSelectQuery = gql`
  query seePortpolios {
    seePortpolios {
      portpolios {
        _id
        title
      }
    }
  }
`;

// 조회수 update Query
export const archiveViewsQuery = gql`
  mutation viewsPortpolio($id: String!) {
    viewsPortpolio(id: $id)
  }
`;
