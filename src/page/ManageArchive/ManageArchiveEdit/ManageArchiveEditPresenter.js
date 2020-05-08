import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../../Components/loader';
import naviList from '../../../Components/naviList';
import ToggleComponent from '../../../Components/toggle';
import FilePond from '../../../Components/filePond';

const ManageArchiveEditPresenter = ({
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
  loading,
}) => {
  return loading ? (
    <Loader />
  ) : (
    <div className="contents registBox">
      <naviList />

      <h2>Archive</h2>
      <table>
        <caption>섬네일 이미지 등록</caption>
        <colgroup>
          <col style={{ width: '25%' }} />
          <col style={{ width: '75%' }} />
        </colgroup>
        <tbody>
          <tr>
            <th>Title</th>
            <td>
              <input
                type="text"
                className="inpTxt"
                id="archiveTitle"
                title="title"
                value={title.value}
                onChange={title.onChange}
              />
            </td>
          </tr>
          <tr>
            <th>Description</th>
            <td>
              <div className="textArea">
                <textarea
                  title="description"
                  value={description.value}
                  onChange={description.onChange}
                />
              </div>
            </td>
          </tr>
          <tr>
            <th>Tags</th>
            <td>
              {tagData && (
                <div className="tagListBox">
                  <ul>
                    {tagData.seeTags.map((tag) => {
                      let duplicateChk = false;
                      if (tags) {
                        duplicateChk = findDuplicates(tags, tag._id);
                      }

                      return (
                        <li key={tag._id}>
                          <ToggleComponent
                            defaultChecked={duplicateChk}
                            onChange={handleUseTag}
                            value={tag._id}
                            label={tag.value}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </td>
          </tr>
          <tr>
            <th>Thumbnail</th>
            {!thumbFileUrl.length && (
              <td>
                <FilePond
                  filepondEl={thumbFilepondEl}
                  files={thumbFiles}
                  setFiles={setThumbFiles}
                  allowMultiple={false}
                  label="Drag & Drop Image"
                />
              </td>
            )}
            {thumbFileUrl.length > 0 && (
              <td>
                <div className="previewThumbImgBox">
                  <span>
                    <img src={thumbFileUrl[0]} alt={thumbFileUrl[0]} />
                  </span>
                  <button type="button" onClick={() => setThumbFileUrl([])}>
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
              </td>
            )}
          </tr>
          <tr>
            <th>Portpolio</th>
            <td>
              <FilePond
                filepondEl={filepondEl}
                files={files}
                setFiles={setFiles}
                allowMultiple
                label="Drag & Drop Image"
              />

              {portpolioData && (
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

      <div className="btnPageBox">
        {!portpolioData ? (
          <button
            className="btnCustm01"
            type="button"
            onClick={() => handleUpload('upload')}
          >
            <span>Upload Archive</span>
          </button>
        ) : (
          <button
            className="btnCustm01"
            type="button"
            onClick={() => handleUpload('edit')}
          >
            <span>Edit Archive</span>
          </button>
        )}
        {portpolioData && (
          <button
            className="btnCustm01"
            type="button"
            onClick={() =>
              handleDeleteArchive(portpolioData.detailPortpolio._id)
            }
            style={{ color: 'red' }}
          >
            <span>Delete Archive</span>
          </button>
        )}
      </div>
    </div>
  );
};

ManageArchiveEditPresenter.defaultProps = {
  thumbFileUrl: [],
  fileUrl: [],
  tagData: null,
  tags: '',
  portpolioData: null,
  title: '',
  description: '',
};

ManageArchiveEditPresenter.propTypes = {
  filepondEl: PropTypes.object.isRequired,
  thumbFilepondEl: PropTypes.object.isRequired,
  thumbFiles: PropTypes.array.isRequired,
  files: PropTypes.array.isRequired,
  setThumbFiles: PropTypes.func.isRequired,
  setFiles: PropTypes.func.isRequired,
  thumbFileUrl: PropTypes.array,
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
  loading: PropTypes.bool.isRequired,
};

export default ManageArchiveEditPresenter;
