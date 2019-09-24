import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { useInput } from "rooks";
import request from "superagent";
import { useMutation } from "react-apollo-hooks";
import PortpolioUploadPresenter from "./PortpolioUploadPresenter";
import { UPLOAD_PORTPOLIO } from "./PortpolioUploadQueries";

let fileUrl = [];
let toastId = null;

const PortpolioUploadContainer = ({ history, action }) => {
  const imageMaxSize = 2097152; //bytes
  const acceeptedFileTypes =
    "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
  const acceptedFileTypesArray = acceeptedFileTypes
    .split(",")
    .map(item => item.trim());

  const title = useInput("");
  const description = useInput("");
  const tag = useInput("");
  const [files, setFiles] = useState([]);
  const [uploadPortpolioMutation] = useMutation(UPLOAD_PORTPOLIO);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: acceeptedFileTypes,
    maxSize: imageMaxSize,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        verifyFile(rejectedFiles);
      }

      if (acceptedFiles && acceptedFiles.length > 0) {
        const isVerified = verifyFile(acceptedFiles);
        if (isVerified) {
          setFiles(
            acceptedFiles.map(file =>
              Object.assign(file, {
                preview: URL.createObjectURL(file)
              })
            )
          );
        }
      }
    }
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const verifyFile = files => {
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const currentFile = files[i];
        const currentFileType = currentFile.type;
        const currentFileSize = currentFile.size;
        if (!acceptedFileTypesArray.includes(currentFileType)) {
          toast.error("This file is not allowed. Only images are allowed");
          return false;
        }

        if (currentFileSize > imageMaxSize) {
          toast.error(
            `This file is not allowed. ${currentFileSize} bytes is too large`
          );
          return false;
        }
      }

      return true;
    }
  };

  const removeFile = file => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

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
        uploadPortpolio: { _id: portpolioId }
      }
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
      if (title.value !== "" && files && files.length > 0) {
        const portpolioId = await portpolioUpload(files);
        toast.update(toastId, {
          render: "Portpolio Upload Success",
          type: "success",
          autoClose: 5000,
          onClose: () => history.push(`/portpolios/${portpolioId}`)
        });
      } else {
        toast.error("Title & File is required");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PortpolioUploadPresenter
      getRootProps={getRootProps}
      getInputProps={getInputProps}
      isDragActive={isDragActive}
      isDragAccept={isDragAccept}
      isDragReject={isDragReject}
      removeFile={removeFile}
      files={files}
      title={title}
      description={description}
      tag={tag}
      handleSubmit={handleSubmit}
    />
  );
};

export default PortpolioUploadContainer;
