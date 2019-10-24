import { gql } from 'apollo-boost';

export const mainBannerQuery = gql`
  query seeBanners {
    seeBanners {
      _id
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

export const mainBannerDetailQuery = gql`
  query detailBanner($id: String, $portpolioId: String) {
    detailBanner(id: $id, portpolioId: $portpolioId) {
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
  mutation uploadBanner($fileUrl: [String!]!, $portpolioId: String!) {
    uploadBanner(fileUrl: $fileUrl, portpolioId: $portpolioId) {
      _id
    }
  }
`;

export const mainBannerModifyQuery = gql`
  mutation modifyBanner(
    $id: String!
    $fileUrl: [String!]!
    $portpolioId: String!
  ) {
    modifyBanner(id: $id, fileUrl: $fileUrl, portpolioId: $portpolioId)
  }
`;

export const mainBannerDeleteQuery = gql`
  mutation deleteBanner($id: String!) {
    deleteBanner(id: $id)
  }
`;
