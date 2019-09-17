import React, { useCallback } from "react";
import PortpolioUploadPresenter from "./PortpolioUploadPresenter";
import request from "superagent";
import { useInput } from "rooks";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { UPLOAD_PORTPOLIO } from "./PortpolioUploadQueries";

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

  const maxSize = 1048576;
  let previewSrc = [];

  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          previewSrc.push(reader.result);
        };
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");

        reader.readAsBinaryString(file);
      });
    },
    [previewSrc]
  );

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
    acceptedFiles,
    rejectedFiles,
    rootRef
  } = useDropzone({
    onDrop,
    accept: "image/png",
    minSize: 0,
    maxSize,
    autoQueue: false
  });

  const isFileTooLarge =
    rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

  console.log(acceptedFiles);
  return (
    <PortpolioUploadPresenter
      handleFileChangeStatus={handleFileChangeStatus}
      handleThumbFileChangeStatus={handleThumbFileChangeStatus}
      handleSubmit={handleSubmit}
      title={title}
      description={description}
      tag={tag}
      isDragActive={isDragActive}
      getRootProps={getRootProps}
      getInputProps={getInputProps}
      isDragReject={isDragReject}
      acceptedFiles={acceptedFiles}
      rejectedFiles={rejectedFiles}
      isFileTooLarge={isFileTooLarge}
      rootRef={rootRef}
      previewSrc={previewSrc}
    />
  );
};

export default PortpolioUploadContainer;
