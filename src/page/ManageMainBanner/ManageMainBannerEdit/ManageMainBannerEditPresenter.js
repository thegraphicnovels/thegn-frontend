import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../../components/loader';
import NaviList from '../../../components/naviList';
import FilePond from '../../../components/filePond';

const ManageMainBannerEditPresenter = ({
  title,
  filepondEl,
  files,
  setFiles,
  portId,
  setPortId,
  fileUrl,
  setFileUrl,
  mainBannerData,
  selectPortpolioData,
  handleUpload,
  handleMainBannerDelete,
  // handleDelFile,
  loading,
}) => {
  return loading ? (
    <Loader />
  ) : (
    <div className="contents">
      <NaviList />

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
              <th>Title</th>
              <td>
                <input
                  type="text"
                  className="inpTxt"
                  id="bannerTitle"
                  title="title"
                  value={title.value}
                  onChange={title.onChange}
                />
              </td>
            </tr>
            <tr>
              <th>Connect Portpolio</th>
              <td>
                {selectPortpolioData && (
                  // <span className="titS">
                  //   {mainBannerData.detailBanner.portpolio.title}
                  // </span>
                  <label htmlFor="selectPortpolio" className="selectBox">
                    <select
                      id="selectPortpolio"
                      onChange={(e) => setPortId(e.target.value)}
                      defaultValue={portId}
                    >
                      <option value="">- Choose Portpolio -</option>
                      {selectPortpolioData.seePortpolios.portpolios.map(
                        (portpolio) => (
                          <option key={portpolio._id} value={portpolio._id}>
                            {portpolio.title}
                          </option>
                        ),
                      )}
                    </select>
                  </label>
                )}
                {/* {!mainBannerData && selectPortpolioData && (
                  <label htmlFor="selectPortpolio" className="selectBox">
                    <select
                      id="selectPortpolio"
                      onChange={e => setPortId(e.target.value)}
                    >
                      <option value="">- Choose Portpolio -</option>
                      {selectPortpolioData.seePortpolios.portpolios.map(
                        portpolio => (
                          <option key={portpolio._id} value={portpolio._id}>
                            {portpolio.title}
                          </option>
                        ),
                      )}
                    </select>
                  </label>
                )} */}
              </td>
            </tr>
            <tr>
              <th>Banner</th>
              {!fileUrl.length && (
                <td>
                  <FilePond
                    filepondEl={filepondEl}
                    files={files}
                    setFiles={setFiles}
                    allowMultiple
                    label="Drag & Drop Main Banner"
                  />
                </td>
              )}
              {fileUrl.length > 0 && (
                <td>
                  <div className="previewThumbImgBox">
                    <span>
                      <img src={fileUrl[0]} alt={fileUrl[0]} />
                    </span>
                    <button type="button" onClick={() => setFileUrl([])}>
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
          </tbody>
        </table>
      </div>

      <div className="btnPageBox">
        {!mainBannerData ? (
          <button
            className="btnCustm"
            type="button"
            onClick={() => handleUpload('upload')}
          >
            <span>Upload</span>
          </button>
        ) : (
          <button
            className="btnCustm"
            type="button"
            onClick={() => handleUpload('edit')}
          >
            <span>Edit</span>
          </button>
        )}
        {mainBannerData && (
          <button
            className="btnCustm"
            type="button"
            onClick={() => handleMainBannerDelete(mainBannerData._id)}
            style={{ color: 'red' }}
          >
            <span>Delete</span>
          </button>
        )}
      </div>
    </div>
  );
};

ManageMainBannerEditPresenter.defaultProps = {
  title: '',
  fileUrl: [],
  portId: '',
  mainBannerData: null,
  selectPortpolioData: null,
};

ManageMainBannerEditPresenter.propTypes = {
  title: PropTypes.object,
  filepondEl: PropTypes.object.isRequired,
  files: PropTypes.array.isRequired,
  setFiles: PropTypes.func.isRequired,
  portId: PropTypes.string,
  setPortId: PropTypes.func.isRequired,
  fileUrl: PropTypes.array,
  setFileUrl: PropTypes.func.isRequired,
  mainBannerData: PropTypes.object,
  selectPortpolioData: PropTypes.object,
  handleUpload: PropTypes.func.isRequired,
  handleMainBannerDelete: PropTypes.func.isRequired,
  // handleDelFile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ManageMainBannerEditPresenter;
