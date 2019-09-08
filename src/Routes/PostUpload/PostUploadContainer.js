import React from "react";
import UploadPresenter from "./PostUploadPresenter";
import request from "superagent";
import { useInput } from "rooks";
import { useMutation } from "react-apollo-hooks";
import { useTitle } from "Hooks/useTitle";
import {
  POST_UPDATE,
  POST_UPLOAD,
  POST_UPLOAD_FILE
} from "./PostUploadQueries";

import { toast } from "react-toastify";

let FileArr = [];

const PostUploadContainer = () => {
  useTitle("Upload | The GN");

  const title = useInput("");
  const description = useInput("");
  const tag = useInput("");

  const [uploadPostMutation] = useMutation(POST_UPLOAD, {
    variables: {
      title: title.value,
      description: description.value
    }
  });

  const [uploadPostFileMutation] = useMutation(POST_UPLOAD_FILE);

  const [updatePostMutation] = useMutation(POST_UPDATE);

  const handleChangeStatus = (file, status) => {
    if (status === "done") {
      FileArr.push(file.file);
    } else if (status === "removed") {
      FileArr = FileArr.filter(arrFile => arrFile !== file.file);
    }
  };

  const fileUpload = postId => {
    // let secureUrl;
    FileArr.map(async file => {
      await request
        .post(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL)
        .field(
          "upload_preset",
          process.env.REACT_APP_CLOUDINARY_UPLOAD_POST_PRESET
        )
        .field("file", file)
        .then(async response => {
          const {
            body: { secure_url }
          } = response;
          if (secure_url) {
            try {
              const {
                data: {
                  uploadPostFile: { _id: fileId }
                }
              } = await uploadPostFileMutation({
                variables: {
                  postId,
                  url: secure_url
                }
              });

              if (fileId) {
                await updatePostMutation({
                  variables: {
                    postId,
                    fileId,
                    title: title.value,
                    description: description.value
                  }
                });
                // to - do
                // history.push => Portpolio Detail
              }
            } catch (e) {
              console.log(e);
            }
          }
        });
    });
  };

  const handleSubmit = async () => {
    try {
      const {
        data: {
          uploadPost: { _id: postId }
        }
      } = await uploadPostMutation();
      await fileUpload(postId);
      toast.success("success");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <UploadPresenter
      handleChangeStatus={handleChangeStatus}
      handleSubmit={handleSubmit}
      title={title}
      description={description}
      tag={tag}
    />
  );
};

export default PostUploadContainer;
