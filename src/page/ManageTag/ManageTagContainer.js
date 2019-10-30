import React, { useState } from 'react';
import { useInput } from 'rooks';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  tagQuery,
  tagCreateQuery,
  tagModifyQuery,
  tagDeleteQuery,
} from 'apollo/tagQuery';
import ManageTagPresenter from './ManageTagPresenter';

const ManageTagContainer = () => {
  const tag = useInput('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('updateAt');

  const { data: tagData, loading, refetch } = useQuery(tagQuery);
  const [tagCreateMutation] = useMutation(tagCreateQuery, {
    variables: {
      tag: tag.value,
    },
  });
  const [tagModifyMutation] = useMutation(tagModifyQuery);
  const [tagDeleteMutation] = useMutation(tagDeleteQuery);

  const handleTagCreate = async e => {
    e.preventDefault();
    try {
      const {
        data: { createTag },
      } = await tagCreateMutation();

      if (!createTag) {
        window.alert('You dont create Tag');
      } else {
        window.alert('Tag create Success');
        window.location.reload();
      }
    } catch {
      window.alert('This Tag is already taken');
    }
  };

  const handleTagModify = async e => {
    if (window.confirm('Do you want to edit this Tag?')) {
      try {
        const id = Object.keys(e);
        const value = Object.values(e);

        const {
          data: { modifyTag },
        } = await tagModifyMutation({
          variables: {
            id: id[0],
            value: value[0],
          },
        });

        if (!modifyTag) {
          window.alert('You dont modify Tag');
        } else {
          window.alert('Tag modify Success');
          refetch();
        }
      } catch {
        window.alert('This Tag is already taken');
      }
    } else {
      window.location.reload();
    }
  };

  const handleTagDelete = async (id, value) => {
    if (window.confirm(`Do you want to delete this Tag? [${value}]`)) {
      try {
        const {
          data: { deleteTag },
        } = await tagDeleteMutation({
          variables: {
            id,
          },
        });
        if (!deleteTag) {
          window.alert('You dont delete Tag');
        } else {
          window.alert('Tag delete Success');
          window.location.reload();
        }
      } catch {
        window.alert('This tag is delete failed');
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const createSortHandler = property => event => {
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
    return stabilizedThis.map(el => el[0]);
  };

  const getSorting = (ordered, orderedBy) => {
    return ordered === 'desc'
      ? (a, b) => desc(a, b, orderedBy)
      : (a, b) => -desc(a, b, orderedBy);
  };

  return (
    <ManageTagPresenter
      tag={tag}
      tagData={tagData}
      loading={loading}
      handleTagCreate={handleTagCreate}
      handleTagModify={handleTagModify}
      handleTagDelete={handleTagDelete}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      order={order}
      orderBy={orderBy}
      createSortHandler={createSortHandler}
      stableSort={stableSort}
      getSorting={getSorting}
    />
  );
};

export default ManageTagContainer;
