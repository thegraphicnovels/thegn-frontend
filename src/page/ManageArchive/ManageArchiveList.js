import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { useQuery } from '@apollo/react-hooks';
import { archiveListQuery } from '../../apollo/archiveQuery';
import { formatDate } from '../../common';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 600,
    overflow: 'auto',
  },
});

const columns = [
  {
    id: 'title',
    label: 'Title',
    minWidth: 150,
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 150,
  },
  {
    id: 'user',
    label: 'Creator',
    minWidth: 100,
  },
  {
    id: 'tag',
    label: 'Tag',
    minWidth: 100,
  },
  {
    id: 'views',
    label: 'Views',
    minWidth: 100,
  },
  {
    id: 'createAt',
    label: 'Create Date',
    minWidth: 150,
  },
  {
    id: 'updateAt',
    label: 'Update Date',
    minWidth: 150,
  },
];

const ManageArchive = ({ history }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('updateAt');

  const { data, loading } = useQuery(archiveListQuery, {
    fetchPolicy: 'network-only',
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const desc = (a, b, orderedBy) => {
    if (b[orderedBy] < a[orderedBy]) {
      return -1;
    }
    if (b[orderedBy] > a[orderedBy]) {
      return 1;
    }
    return 0;
  };

  const stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const ordered = cmp(a[0], b[0]);
      if (ordered !== 0) return ordered;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getSorting = (ordered, orderedBy) => {
    return ordered === 'desc'
      ? (a, b) => desc(a, b, orderedBy)
      : (a, b) => -desc(a, b, orderedBy);
  };

  return (
    <div className="contents">
      <div className="registBox">
        <h2>Archive</h2>
        <div className="listBarWrap">
          <Link to="/manage/upload/archive" className="btnCustm">
            <span>Add</span>
          </Link>
        </div>

        <div className="listTblWrap">
          <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
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
                  {data &&
                    stableSort(
                      data.seePortpoliosList,
                      getSorting(order, orderBy),
                    )
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
                            {columns.map((column) => {
                              let value = row[column.id];

                              if (column.id === 'description') {
                                if (value) {
                                  if (value.length > 80) {
                                    value = `${value.substr(0, 80)}...`;
                                  }
                                }
                              }

                              if (column.id === 'user') {
                                value = row.user.name;
                              }
                              if (column.id === 'updateAt') {
                                value = formatDate(value);
                              }
                              if (column.id === 'createAt') {
                                value = formatDate(value);
                              }

                              if (column.id === 'tag') {
                                if (row.tags) {
                                  value = row.tags.map((tag, i) => {
                                    if (i === 0) {
                                      return tag.value;
                                    }
                                    return `, ${tag.value}`;
                                  });
                                }
                              }
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  onClick={() =>
                                    history.push(
                                      `/manage/edit/archive/${row._id}`,
                                    )
                                  }
                                >
                                  {value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>

              {!loading && data && (
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  component="div"
                  count={data.seePortpoliosList.length}
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

ManageArchive.propTypes = {
  history: PropTypes.object.isRequired,
};

export default ManageArchive;
