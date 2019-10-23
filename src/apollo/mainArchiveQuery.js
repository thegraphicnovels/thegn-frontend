import { gql } from 'apollo-boost';

export const mainArchiveQuery = gql`
  query seeMainPortpolios {
    seeMainPortpolios {
      _id
      title
      mainImg
      tags {
        _id
        value
      }
    }
  }
`;

export const mainArchiveUploadQuery = gql`
  mutation uploadMainPortpolio($fileUrl: [String!]!, $portpolioId: String!) {
    uploadMainPortpolio(fileUrl: $fileUrl, portpolioId: $portpolioId) {
      _id
    }
  }
`;

export const mainArchiveModifyQuery = gql`
  mutation modifyMainPortpolio($fileUrl: [String!]!, $portpolioId: String!) {
    modifyMainPortpolio(fileUrl: $fileUrl, portpolioId: $portpolioId) {
      _id
    }
  }
`;

export const mainArchiveDeleteQuery = gql`
  mutation deleteMainPortpolio($portpolioId: String!) {
    deleteMainPortpolio(portpolioId: $portpolioId)
  }
`;
