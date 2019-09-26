import React from "react";
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

const FilepondPresenter = ({
  files,
  setFiles,
  onInit,
  handlePondFile,
  uploadUrl
}) => {
  return (
    <FilePond
      acceptedFileTypes={"image/*"}
      files={files}
      allowMultiple={true}
      onupdatefiles={fileItems => {
        setFiles({ file: fileItems.map(fileItem => fileItem.file) });
      }}
      server={uploadUrl}
      oninit={onInit}
      onprocessfile={handlePondFile}
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
    />
  );
};

export default FilepondPresenter;
