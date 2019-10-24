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
      <div className="registBox">
        <h2>Main Banner</h2>

        <table>
          <caption>메인배너 등록</caption>
          <colgroup>
            <col style={{ width: '25%' }} />
            <col style={{ width: '75%' }} />
          </colgroup>
          <tbody>
            <tr>
              <th>Portpolio</th>
              <td>
                {portpolioData && (
                  <span className="titS">{portpolioData.detailPortpolio.title}</span>
                )}
                {!portpolioData && selectPortpolioData && (
                  <label htmlFor="selectPortpolio" className="selectBox">
                    <select id="selectPortpolio" onChange={e => setPortId(e.target.value)}>
                      <option value="">- Choose Portpolio -</option>
                      {selectPortpolioData.seePortpolios.portpolios.map(portpolio => (
                        <option key={portpolio._id} value={portpolio._id}>
                          {portpolio.title}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
              </td>
            </tr>
            <tr>
              <th>Banner</th>
              <td>
                <FilePond
                  filepondEl={filepondEl}
                  files={files}
                  setFiles={setFiles}
                  allowMultiple
                  label="Drag & Drop Main Banner"
                />
                {fileUrl.length > 0 && (
                  <ul className="regImgViewList">
                    {fileUrl.map((file, i) => (
                      <li key={i}>
                        <div className="previewThumbImgBox">
                          <span>
                            <img src={file} alt={file} />
                          </span>
                          <button type="button" onClick={() => handleDelFile(i)}>
                            <em className="blind">삭제</em>
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 26 26"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z"
                                fill="currentColor"
                                fillRule="nonzero"
                              />
                            </svg>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="btnPageBox">
        {!portpolioData ? (
          <button className="btnCustm" type="button" onClick={() => handleUpload('upload')}>
            <span>Upload</span>
          </button>
        ) : (
          <button className="btnCustm" type="button" onClick={() => handleUpload('edit')}>
            <span>Edit</span>
          </button>
        )}
        {portpolioData && (
          <button className="btnCustm" type="button" onClick={() => handleMainArchiveDelete(portpolioData.detailPortpolio._id)}>
            <span>Delete</span>
          </button>
        )}
      </div>


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
