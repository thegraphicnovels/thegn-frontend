import { gql } from 'apollo-boost';

export const mainBannerQuery = gql`
  query seeBanners {
    seeBanners {
      _id
      title
      files {
        url
      }
      portpolio {
        _id
        title
        tags {
          value
        }
      }
      user {
        name
      }
      createAt
      updateAt
    }
  }
`;

export const mainBannerDetailQuery = gql`
  query detailBanner($id: String!) {
    detailBanner(id: $id) {
      title
      files {
        url
      }
      portpolio {
        _id
        title
      }
      user {
        name
      }
      updateAt
    }
  }
`;

export const mainBannerUploadQuery = gql`
  mutation uploadBanner(
    $title: String!
    $fileUrl: [String!]!
    $portpolioId: String
  ) {
    uploadBanner(title: $title, fileUrl: $fileUrl, portpolioId: $portpolioId) {
      _id
    }
  }
`;

export const mainBannerModifyQuery = gql`
  mutation modifyBanner(
    $id: String!
    $title: String!
    $fileUrl: [String!]!
    $portpolioId: String
  ) {
    modifyBanner(
      id: $id
      title: $title
      fileUrl: $fileUrl
      portpolioId: $portpolioId
    )
  }
`;

export const mainBannerDeleteQuery = gql`
  mutation deleteBanner($id: String!) {
    deleteBanner(id: $id)
  }
`;
