import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { formatDate } from 'common';
import { RIEInput } from 'riek';
import NaviList from 'components/naviList';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 600,
    overflow: 'auto',
  },
});

const ManageTagPresenter = ({
  tag,
  tagData,
  loading,
  handleTagCreate,
  handleTagModify,
  handleTagDelete,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  order,
  orderBy,
  createSortHandler,
  stableSort,
  getSorting,
}) => {
  const classes = useStyles();
  const columns = [
    {
      id: 'value',
      label: 'Name',
      minWidth: 170,
      format: (value, id) => (
        <RIEInput value={value} change={handleTagModify} propName={id} />
      ),
    },
    {
      id: 'user',
      label: 'Creator',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'updateAt',
      label: 'Create Date',
      minWidth: 170,
      align: 'center',
    },
    {
      id: '_id',
      label: 'Action',
      minWidth: 170,
      align: 'center',
      format: (id, value) => (
        <button
          className="btnCustm01"
          style={{ color: 'red' }}
          type="button"
          onClick={() => handleTagDelete(id, value)}
        >
          <span>Delete</span>
        </button>
      ),
    },
  ];

  return (
    <div className="contents">
      <NaviList />

      <div className="registBox">
        <h2>Tag</h2>
        <div className="tagAddBox">
          <form onSubmit={handleTagCreate}>
            <span>
              <input
                id="archiveTitle"
                placeholder="Tag를 입력하세요"
                value={tag.value}
                onChange={tag.onChange}
                type="text"
              />
            </span>
            <button type="submit" className="btnCustm">
              <span>Add</span>
            </button>
          </form>
        </div>
        <div className="listTblWrap">
          <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map(column => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        sortDirection={orderBy === columns.id ? order : false}
                      >
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={order}
                          onClick={createSortHandler(column.id)}
                        >
                          {column.label}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tagData &&
                    stableSort(tagData.seeTags, getSorting(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((row, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            {columns.map(column => {
                              let value = row[column.id];
                              if (column.id === 'user') {
                                value = row.user.name;
                              }
                              if (column.id === '_id') {
                                value = column.format(value, row.value);
                              } else if (column.id === 'updateAt') {
                                value = formatDate(value);
                              } else if (column.id === 'value') {
                                value = column.format(value, row._id);
                              }
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>

              {!loading && tagData && (
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  component="div"
                  count={tagData.seeTags.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'previous page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'next page',
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              )}
            </div>
          </Paper>
        </div>
      </div>
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
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  createSortHandler: PropTypes.func.isRequired,
  stableSort: PropTypes.func.isRequired,
  getSorting: PropTypes.func.isRequired,
};

export default ManageTagPresenter;
