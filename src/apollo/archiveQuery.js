import { gql } from 'apollo-boost';

// archive paging
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
          name
        }
        files {
          url
        }
        views
        tags {
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

// archive detail
export const archiveDetailQuery = gql`
  query detailPortpolio($id: String!) {
    detailPortpolio(id: $id) {
      _id
      title
      description
      user {
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

// archive upload
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

// archive modify
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

// archive delete
export const archiveDeleteQuery = gql`
  mutation deletePortpolio($id: String!) {
    deletePortpolio(id: $id)
  }
`;

// archive select box
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

// archive views update
export const archiveViewsQuery = gql`
  mutation viewsPortpolio($id: String!) {
    viewsPortpolio(id: $id)
  }
`;

// archive manage list
export const archiveListQuery = gql`
  query seePortpoliosList($tags: [String], $keyword: String) {
    seePortpoliosList(tags: $tags, keyword: $keyword) {
      _id
      title
      description
      thumbImg
      user {
        name
      }
      files {
        _id
      }
      views
      tags {
        value
      }
      createAt
      updateAt
    }
  }
`;
