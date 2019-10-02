import React, { useState, useRef } from "react";
import { useInput } from "rooks";
import PortpolioUploadPresenter from "./PortpolioUploadPresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";
import request from "superagent";
import { SEE_TAGS } from "../Tag/TagQueries";
import { UPLOAD_PORTPOLIO, MODIFY_PORTPOLIO } from "./PortpolioUploadQueries";
import { DEATIL_PORTPOLIO } from "../Portpolio/PortpolioQueries";

let fileUrl = [];
let toastId = null;

const PortpolioUploadContainer = ({ history, portpolioId }) => {
  const filepondEl = useRef(null);
  const selectEl = useRef(null);
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState([]);
  const { data: tagData } = useQuery(SEE_TAGS);
  const { data: portpolioData } = useQuery(DEATIL_PORTPOLIO, {
    variables: { id: portpolioId }
    // skip: !portpolioId
  });
  const [uploadPortpolioMutation] = useMutation(UPLOAD_PORTPOLIO);
  const [modifyPortpolioMutation] = useMutation(MODIFY_PORTPOLIO);
  const title = useInput(
    portpolioData ? portpolioData.detailPortpolio.title : ""
  );
  const description = useInput(
    portpolioData ? portpolioData.detailPortpolio.description : ""
  );

  const portpolioUpload = async fileArr => {
    toastId = toast("Upload in progress, please wait...", { autoClose: false });
    for (let i = 0; i < fileArr.length; i++) {
      const url = await request
        .post(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL)
        .field(
          "upload_preset",
          process.env.REACT_APP_CLOUDINARY_UPLOAD_POST_PRESET
        )
        .field("file", fileArr[i])
        .then(async response => {
          const {
            body: { secure_url }
          } = response;
          if (secure_url) {
            return secure_url;
          }
        });

      fileUrl.push(url);
    }

    const {
      data: {
        uploadPortpolio: { _id }
      }
    } = await uploadPortpolioMutation({
      variables: {
        title: title.value,
        description: description.value,
        fileUrl,
        tags
      }
    });
    return _id;
  };

  const handleUpload = async action => {
    let _id;
    try {
      if (action === "upload") {
        if (title.value !== "" && files && files.length > 0) {
          _id = await portpolioUpload(files);
        } else {
          toast.error("Title & File is required");
        }
      } else if (action === "edit") {
        if (title.value !== "") {
          const {
            data: { modifyPortpolio }
          } = await modifyPortpolioMutation({
            variables: {
              id: portpolioId,
              title: title.value,
              description: description.value,
              tags
            }
          });
          _id = modifyPortpolio;
        } else {
          toast.error("Title is required");
        }
      }

      toast.update(toastId, {
        render: "Portpolio Upload Success",
        type: "success",
        autoClose: 5000,
        onClose: () => history.push(`/portpolios/${_id}`)
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleTagSelect = e => {
    setTags(e.map(tag => tag.value));
  };

  let tagMap = {};
  let tagObject = [];
  if (tagData) {
    for (let i = 0; i < tagData.seeTags.length; i++) {
      tagMap.label = tagData.seeTags[i].value;
      tagMap.value = tagData.seeTags[i]._id;
      tagObject.push(tagMap);
      tagMap = {};
    }
  }

  return (
    <PortpolioUploadPresenter
      filepondEl={filepondEl}
      selectEl={selectEl}
      files={files}
      setFiles={setFiles}
      title={title}
      description={description}
      tagObject={tagObject}
      handleUpload={handleUpload}
      handleTagSelect={handleTagSelect}
      portpolioData={portpolioData}
    />
  );
};

export default PortpolioUploadContainer;
