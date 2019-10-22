import React from 'react';
import PropTypes from 'prop-types';
import FileUpload from 'components/fileUpload';
import Toggle from 'components/toggle';

const ManageArchivePresenter = ({
  filepondEl,
  thumbFilepondEl,
  thumbFiles,
  setThumbFiles,
  files,
  setFiles,
  thumbFileUrl,
  setThumbFileUrl,
  fileUrl,
  tagData,
  tags,
  portpolioData,
  title,
  description,
  handleUpload,
  handleUseTag,
  handleDelFile,
  handleDeleteArchive,
  findDuplicates,
}) => {
  return (
    <div>
      <FileUpload
        filepondEl={thumbFilepondEl}
        files={thumbFiles}
        setFiles={setThumbFiles}
        allowMultiple={false}
        label="Drag & Drop Thumbnail File"
      />
      <FileUpload
        filepondEl={filepondEl}
        files={files}
        setFiles={setFiles}
        allowMultiple
        label="Drag & Drop Portpolio File"
      />
      {portpolioData && thumbFileUrl && (
        <div style={{ display: 'flex', flexdirection: 'row' }}>
          <div>
            <img
              src={thumbFileUrl}
              alt={thumbFileUrl}
              style={{ width: '500px', height: '500px', padding: '10px' }}
            />
            <button type="button" onClick={() => setThumbFileUrl('')}>
              삭제
            </button>
          </div>
        </div>
      )}
      {portpolioData && (
        <div style={{ display: 'flex', flexdirection: 'row' }}>
          {fileUrl.map((file, i) => (
            <div key={i}>
              <img
                src={file}
                alt={file}
                style={{ width: '500px', height: '500px', padding: '10px' }}
              />
              <button type="button" onClick={() => handleDelFile(i)}>
                삭제
              </button>
            </div>
          ))}
        </div>
      )}
      <input
        id="archiveTitle"
        placeholder="Title"
        value={title.value}
        onChange={title.onChange}
        type="text"
      />
      <textarea
        placeholder="Description"
        value={description.value}
        onChange={description.onChange}
      />

      {tagData &&
        tagData.seeTags.map(tag => (
          <Toggle
            key={tag._id}
            defaultChecked={tags && findDuplicates(tags, tag._id)}
            onChange={handleUseTag}
            value={tag._id}
            label={tag.value}
          />
        ))}

      {!portpolioData ? (
        <button type="button" onClick={() => handleUpload('upload')}>
          Upload Archive
        </button>
      ) : (
        <button type="button" onClick={() => handleUpload('edit')}>
          Edit Archive
        </button>
      )}
      {portpolioData && (
        <button
          type="button"
          onClick={() => handleDeleteArchive(portpolioData._id)}
        >
          Delete Archive
        </button>
      )}
    </div>
  );
};

ManageArchivePresenter.defaultProps = {
  thumbFileUrl: '',
  fileUrl: '',
  tagData: null,
  tags: '',
  portpolioData: null,
  title: '',
  description: '',
};

ManageArchivePresenter.propTypes = {
  filepondEl: PropTypes.object.isRequired,
  thumbFilepondEl: PropTypes.object.isRequired,
  thumbFiles: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  setThumbFiles: PropTypes.func.isRequired,
  setFiles: PropTypes.func.isRequired,
  thumbFileUrl: PropTypes.string,
  setThumbFileUrl: PropTypes.func.isRequired,
  fileUrl: PropTypes.array,
  tagData: PropTypes.object,
  tags: PropTypes.array,
  portpolioData: PropTypes.object,
  title: PropTypes.object,
  description: PropTypes.object,
  handleUpload: PropTypes.func.isRequired,
  handleUseTag: PropTypes.func.isRequired,
  handleDelFile: PropTypes.func.isRequired,
  handleDeleteArchive: PropTypes.func.isRequired,
  findDuplicates: PropTypes.func.isRequired,
};

export default ManageArchivePresenter;
