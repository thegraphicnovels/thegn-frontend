import React from "react";
import PortpolioUploadPresenter from "./PortpolioUploadPresenter";
import request from "superagent";
import { useInput } from "rooks";
import { useMutation } from "react-apollo-hooks";
import { UPLOAD_PORTPOLIO } from "./PortpolioUploadQueries";
import { toast } from "react-toastify";

let FileArr = [];
let ThumbArr = [];
let fileUrl = [];

const PortpolioUploadContainer = () => {
  const title = useInput("");
  const description = useInput("");
  const tag = useInput("");

  const [uploadPortpolioMutation] = useMutation(UPLOAD_PORTPOLIO);

  const handleFileChangeStatus = (file, status) => {
    if (status === "done") {
      FileArr.push(file.file);
    } else if (status === "removed") {
      FileArr = FileArr.filter(arrFile => arrFile !== file.file);
    }
  };
  const handleThumbFileChangeStatus = (file, status) => {
    if (status === "done") {
      ThumbArr.push(file.file);
    } else if (status === "removed") {
      ThumbArr = ThumbArr.filter(arrFile => arrFile !== file.file);
    }
  };

  const portpolioUpload = async fileArr => {
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
      data: { uploadPortpolio: portpolioId }
    } = await uploadPortpolioMutation({
      variables: {
        title: title.value,
        description: description.value,
        fileUrl
      }
    });
    return portpolioId;
  };

  const handleSubmit = async () => {
    try {
      if (title.value !== "" && FileArr && FileArr.length > 0) {
        const portpolioId = await portpolioUpload(FileArr);
        toast.success("Portpoilo Upload");
        console.log(portpolioId);
      } else {
        toast.error("Title & File is required");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PortpolioUploadPresenter
      handleFileChangeStatus={handleFileChangeStatus}
      handleThumbFileChangeStatus={handleThumbFileChangeStatus}
      handleSubmit={handleSubmit}
      title={title}
      description={description}
      tag={tag}
    />
  );
};

export default PortpolioUploadContainer;
