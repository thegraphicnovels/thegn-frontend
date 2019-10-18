import { gql } from 'apollo-boost';

export const archiveQuery = gql`
  query seePortpolios($page: Int, $limit: Int, $tags: [String]) {
	seePortpolios(page: $page, limit: $limit, tags: $tags) {
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