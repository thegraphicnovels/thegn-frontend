import {gql} from 'apollo-boost';

export const achiveQuery = gql`
    query seePortpolios($page: Int!, $limit: Int!) {
        seePortpolios(page: $page, limit: $limit) {
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