import React, { useState } from "react";
import FilepondPresenter from "./FilepondPresenter";
import { useInput } from "rooks";

const FilepondContainer = () => {
  const [files, setFiles] = useState([]);
  const title = useInput("");
  const description = useInput("");
  // const uploadUrl = `${process.env.REACT_APP_CLOUDINARY_UPLOAD_URL}?upload_preset=${process.env.REACT_APP_CLOUDINARY_UPLOAD_POST_PRESET}`;

  return (
    <FilepondPresenter
      files={files}
      setFiles={setFiles}
      title={title}
      description={description}
      // handlePondFile={handlePondFile}
    />
  );
};

export default FilepondContainer;
