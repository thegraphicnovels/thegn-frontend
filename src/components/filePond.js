import React from 'react';
import PropTypes from 'prop-types';
import { FilePond as ReactFilePond, registerPlugin } from 'react-filepond';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
);

const FilePond = ({ filepondEl, files, setFiles, allowMultiple, label }) => {
  return (
    <ReactFilePond
      ref={filepondEl}
      files={files}
      acceptedFileTypes="image/*"
      allowMultiple={allowMultiple}
      onupdatefiles={fileItems => {
        setFiles(fileItems.map(fileItem => fileItem.file));
      }}
      labelIdle={label}
      style={{ width: '400px;' }}
    />
  );
};

FilePond.propTypes = {
  filepondEl: PropTypes.object.isRequired,
  files: PropTypes.any.isRequired,
  setFiles: PropTypes.func.isRequired,
  allowMultiple: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default FilePond;
