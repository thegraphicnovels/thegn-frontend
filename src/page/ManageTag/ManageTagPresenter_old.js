import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { formatDate } from 'common';
import { RIEInput } from 'riek';

const ManageTagPresenter = ({
  tag,
  tagData,
  loading,
  handleTagCreate,
  handleTagModify,
  handleTagDelete,
}) => {
  return (
    <div>
      <div className="tagAddBox">
        <span>
          <input
            id="archiveTitle"
            placeholder="Tag를 입력하세요"
            value={tag.value}
            onChange={tag.onChange}
            type="text"
          />
        </span>
        <button
          type="button"
          className="btnCustm"
          onClick={() => handleTagCreate()}
        >
          <span>Add</span>
        </button>
      </div>
      {console.log(tagData)}
      {!loading && tagData && (
        <ReactTable
          noDataText="No Tags"
          data={tagData.seeTags}
          columns={[
            {
              Header: 'Id',
              accessor: '_id',
              show: false,
            },
            {
              Header: 'Tag',
              accessor: 'value',
              width: 300,
              Cell: row => (
                <RIEInput
                  value={row.value}
                  change={handleTagModify}
                  propName={row.row._id}
                />
              ),
            },
            {
              Header: 'Creator',
              accessor: 'user.name',
              width: 150,
            },
            {
              Header: 'Create Date',
              id: 'updateAt',
              accessor: d => {
                const { updateAt } = d;
                return formatDate(updateAt);
              },
              width: 160,
            },
            {
              Header: 'Action',
              width: 100,
              Cell: row => (
                <button
                  className="btnCustm01"
                  type="button"
                  onClick={() => handleTagDelete(row.row._id, row.row.value)}
                >
                  <span>Delete</span>
                </button>
              ),
            },
          ]}
          className="-striped -highlight"
          minRows={1}
          defaultPageSize={10}
          defaultSorted={[
            {
              id: 'updateAt',
              desc: true,
            },
          ]}
        />
      )}
    </div>
  );
};

ManageTagPresenter.defaultProps = {
  tag: '',
  tagData: null,
};

ManageTagPresenter.propTypes = {
  tag: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  tagData: PropTypes.object,
  handleTagCreate: PropTypes.func.isRequired,
  handleTagModify: PropTypes.func.isRequired,
  handleTagDelete: PropTypes.func.isRequired,
};

export default ManageTagPresenter;
