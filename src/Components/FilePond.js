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

export default ({ filepondEl, files, setFiles }) => {
  return (
    <FilePond
      ref={filepondEl}
      files={files}
      acceptedFileTypes={"image/*"}
      allowMultiple={true}
      onupdatefiles={fileItems => {
        setFiles(fileItems.map(fileItem => fileItem.file));
      }}
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      style={{ width: "400px;" }}
    ></FilePond>
  );
};
