import React from "react";
import TagPresenter from "./TagPresenter";
import { useInput } from "rooks";
import { CREATE_TAG, SEE_TAGS, MODIFY_TAG, DELETE_TAG } from "./TagQueries";
import { useMutation, useQuery } from "react-apollo-hooks";
import { toast } from "react-toastify";

const TagContainer = ({ setActive }) => {
  let tag = useInput("");

  const { data, loading, refetch } = useQuery(SEE_TAGS);
  const [createTagMutation] = useMutation(CREATE_TAG, {
    variables: {
      tag: tag.value
    }
  });
  const [modifyTagMutation] = useMutation(MODIFY_TAG);
  const [deleteTagMutation] = useMutation(DELETE_TAG);

  const handleTagCreate = async () => {
    try {
      const {
        data: { createTag }
      } = await createTagMutation();

      if (!createTag) {
        toast.error("You dont create Tag");
      } else {
        toast.success("Tag create Success");
        refetch();
        setActive("2");
      }
    } catch {
      toast.error("This Tag is already taken");
    }
  };

  const handleTagModify = async e => {
    try {
      const id = Object.keys(e);
      const value = Object.values(e);

      const {
        data: { modifyTag }
      } = await modifyTagMutation({
        variables: {
          id: id[0],
          value: value[0]
        }
      });

      if (!modifyTag) {
        toast.error("You dont modify Tag");
      } else {
        toast.success("Tag modify Success");
        refetch();
        setActive("2");
      }
    } catch {
      toast.error("This Tag is already taken");
    }
  };

  const handleTagDelete = async id => {
    try {
      const {
        data: { deleteTag }
      } = await deleteTagMutation({
        variables: {
          id
        }
      });

      if (!deleteTag) {
        toast.error("You dont delete Tag");
      } else {
        toast.success("Tag delete Success");
        refetch();
        setActive("2");
      }
    } catch {
      toast.error("This tag is delete failed");
    }
  };

  return (
    <TagPresenter
      tag={tag}
      data={data}
      loading={loading}
      handleTagCreate={handleTagCreate}
      handleTagModify={handleTagModify}
      handleTagDelete={handleTagDelete}
    />
  );
};

export default TagContainer;
