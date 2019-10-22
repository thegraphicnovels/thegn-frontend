import React from 'react';
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

  const { data: tagData, loading, refetch } = useQuery(tagQuery);
  const [tagCreateMutation] = useMutation(tagCreateQuery, {
    variables: {
      tag: tag.value,
    },
  });
  const [tagModifyMutation] = useMutation(tagModifyQuery);
  const [tagDeleteMutation] = useMutation(tagDeleteQuery);

  const handleTagCreate = async () => {
    try {
      const {
        data: { createTag },
      } = await tagCreateMutation();

      if (!createTag) {
        window.alert('You dont create Tag');
      } else {
        window.alert('Tag create Success');
        refetch();
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
          refetch();
        }
      } catch {
        window.alert('This tag is delete failed');
      }
    }
  };

  return (
    <ManageTagPresenter
      tag={tag}
      tagData={tagData}
      loading={loading}
      handleTagCreate={handleTagCreate}
      handleTagModify={handleTagModify}
      handleTagDelete={handleTagDelete}
    />
  );
};

export default ManageTagContainer;
