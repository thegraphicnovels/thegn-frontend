import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { archiveSelectQuery } from 'apollo/archiveQuery';
import request from 'superagent';
import {
  mainBannerUploadQuery,
  mainBannerModifyQuery,
  mainBannerDeleteQuery,
  mainBannerDetailQuery,
} from 'apollo/mainBannerQuery';

import ManageMainBannerPresenter from './ManageMainBannerPresenter';

const ManageMainBannerContainer = ({
  history,
  match: {
    params: { mainBannerId },
  },
}) => {
  const filepondEl = useRef(null);
  const [files, setFiles] = useState([]); // bannerfile
  const [fileUrl, setFileUrl] = useState([]); // bannerfile url
  const [portId, setPortId] = useState('');

  const { data: mainBannerData } = useQuery(mainBannerDetailQuery, {
    variables: { id: mainBannerId },
    fetchPolicy: 'network-only',
    skip: !mainBannerId,
    onCompleted: ({ detailBanner }) => {
      const bannerFile = detailBanner.files;
      if (bannerFile) {
        const fileArr = [];
        for (let i = 0; i < bannerFile.length; i++) {
          fileArr.push(bannerFile[i].url);
        }
        setFileUrl(fileArr);
      }
      setPortId(detailBanner.portpolio._id);
    },
  });

  const { data: selectPortpolioData } = useQuery(archiveSelectQuery, {
    fetchPolicy: 'network-only',
    skip: mainBannerId, // portpolioId가 있으면 건너뛴다.
  });

  const [mainBannerUploadMutation] = useMutation(mainBannerUploadQuery);
  const [mainBannerModifyMutation] = useMutation(mainBannerModifyQuery);
  const [mainBannerDeleteMutation] = useMutation(mainBannerDeleteQuery);

  // Cloudinary upload Function
  const bannerUpload = async fileArr => {
    for (let i = 0; i < fileArr.length; i++) {
      const url = await request
        .post(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL)
        .field(
          'upload_preset',
          process.env.REACT_APP_CLOUDINARY_UPLOAD_MAIN_PRESET,
        )
        .field('file', fileArr[i])
        .then(async response => {
          const {
            body: { secure_url: secureUrl },
          } = response;

          if (secureUrl) return secureUrl;
          return '';
        });

      setFileUrl(file => {
        file.push(url);
        return file;
      });
    }
  };

  const handleUpload = async action => {
    let _id;
    try {
      if (action === 'upload') {
        if (files.length > 0) {
          if (portId) {
            if (files) {
              await bannerUpload(files);
            }

            const {
              data: { uploadBanner },
            } = await mainBannerUploadMutation({
              variables: {
                fileUrl,
                portpolioId: portId,
              },
            });

            _id = uploadBanner._id;
          } else {
            window.alert('Choose Connection Portfolio');
          }
        } else {
          window.alert('Main image file is required');
        }
      } else if (action === 'edit') {
        if (files.length > 0 || fileUrl.length > 0) {
          if (files) {
            await bannerUpload(files);
          }

          const {
            data: { modifyBanner },
          } = await mainBannerModifyMutation({
            variables: {
              id: mainBannerId,
              fileUrl,
              portpolioId: portId,
            },
          });
          _id = modifyBanner;
        } else {
          window.alert('Main image file is required');
        }
      }

      if (_id) {
        history.push('/manage/mainBanner');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleMainBannerDelete = async () => {
    try {
      if (files.length > 0 || fileUrl.length > 0) {
        if (window.confirm('Do you wnat to delete Main Img?')) {
          const {
            data: { deleteBanner },
          } = await mainBannerDeleteMutation({
            variables: {
              id: mainBannerId,
            },
          });

          if (deleteBanner) {
            window.alert('This Banner main Img Delete success');
            history.push('/');
          } else {
            window.alert('Failed to delete Banner main Img');
          }
        }
      } else {
        window.alert('No images to delete');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelFile = index => {
    if (window.confirm('Do you wnat to delete this Img?'))
      setFileUrl(file => {
        const filesArr = [];
        for (let i = 0; i < file.length; i++) {
          if (index !== i) {
            filesArr.push(file[i]);
          }
        }
        return filesArr;
      });
  };

  return (
    <ManageMainBannerPresenter
      filepondEl={filepondEl}
      files={files}
      setFiles={setFiles}
      setPortId={setPortId}
      fileUrl={fileUrl}
      mainBannerData={mainBannerData}
      selectPortpolioData={selectPortpolioData}
      handleUpload={handleUpload}
      handleMainBannerDelete={handleMainBannerDelete}
      handleDelFile={handleDelFile}
    />
  );
};

ManageMainBannerContainer.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default ManageMainBannerContainer;
