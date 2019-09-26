import React, { useState } from "react";
import FilepondPresenter from "./FilepondPresenter";

const FilepondContainer = () => {
  const [files, setFiles] = useState([]);
  const uploadUrl = `${process.env.REACT_APP_CLOUDINARY_UPLOAD_URL}?upload_preset=${process.env.REACT_APP_CLOUDINARY_UPLOAD_POST_PRESET}`;
  const onInit = () => {};
  const handlePondFile = file => {
    console.log("File added", file);
  };

  console.log(files);

  return (
    <FilepondPresenter
      uploadUrl={uploadUrl}
      files={files}
      setFiles={setFiles}
      onInit={onInit}
      handlePondFile={handlePondFile}
    />
  );
};

export default FilepondContainer;
