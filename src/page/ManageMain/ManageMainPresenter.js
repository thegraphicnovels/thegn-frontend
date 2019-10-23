import React from 'react';
import PropTypes from 'prop-types';
import FilePond from 'components/filePond';

const ManageMainPresenter = ({
  filepondEl,
  files,
  setFiles,
  setPortId,
  fileUrl,
  portpolioData,
  selectPortpolioData,
  handleUpload,
  handleMainArchiveDelete,
  handleDelFile,
}) => {
  return (
    <div>
      <div>
        <h3>
          Manage Main{' '}
          {portpolioData && `[${portpolioData.detailPortpolio.title}]`}
        </h3>
      </div>
      <FilePond
        filepondEl={filepondEl}
        files={files}
        setFiles={setFiles}
        allowMultiple
        label="Drag & Drop Archive Main Img File"
      />
      {fileUrl && (
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
      {!portpolioData && selectPortpolioData && (
        <select onChange={e => setPortId(e.target.value)}>
          <option value="">- Choose Portpolio -</option>
          {selectPortpolioData.seePortpolios.portpolios.map(portpolio => (
            <option key={portpolio._id} value={portpolio._id}>
              {portpolio.title}
            </option>
          ))}
        </select>
      )}
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
          onClick={() =>
            handleMainArchiveDelete(portpolioData.detailPortpolio._id)}
        >
          Delete Archive
        </button>
      )}
    </div>
  );
};

ManageMainPresenter.defaultProps = {
  fileUrl: '',
  portpolioData: null,
  selectPortpolioData: null,
};

ManageMainPresenter.propTypes = {
  filepondEl: PropTypes.object.isRequired,
  files: PropTypes.array.isRequired,
  setFiles: PropTypes.func.isRequired,
  setPortId: PropTypes.func.isRequired,
  fileUrl: PropTypes.array,
  portpolioData: PropTypes.object,
  selectPortpolioData: PropTypes.object,
  handleUpload: PropTypes.func.isRequired,
  handleMainArchiveDelete: PropTypes.func.isRequired,
  handleDelFile: PropTypes.func.isRequired,
};

export default ManageMainPresenter;
