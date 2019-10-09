import {gql} from 'apollo-boost';

export const achiveQuery = gql`
    query seePortpolios($page: Int, $limit: Int, $tags : [String]) {
        seePortpolios(page: $page, limit: $limit, tags : $tags) {
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