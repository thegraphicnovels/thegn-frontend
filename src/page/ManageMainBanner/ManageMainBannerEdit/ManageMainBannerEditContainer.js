import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { archiveSelectQuery } from 'apollo/archiveQuery';
import request from 'superagent';
import {
  mainBannerUploadQuery,
  mainBannerModifyQuery,
  mainBannerDeleteQuery,
  mainBannerDetailQuery,
} from 'apollo/mainBannerQuery';

import { useInput } from 'rooks';
import ManageMainBannerEditPresenter from './ManageMainBannerEditPresenter';

const ManageMainBannerEditContainer = ({
  history,
  match: {
    params: { mainBannerId },
  },
}) => {
  const filepondEl = useRef(null);
  const [files, setFiles] = useState([]); // bannerfile
  const [fileUrl, setFileUrl] = useState([]); // bannerfile url
  const [portId, setPortId] = useState('');

  const [archiveSelectQeury, { data: selectPortpolioData }] = useLazyQuery(
    archiveSelectQuery,
    {
      fetchPolicy: 'network-only',
    },
  );

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

      if (detailBanner.portpolio) {
        setPortId(detailBanner.portpolio._id);
      }
      archiveSelectQeury();
    },
  });

  const title = useInput(
    mainBannerData ? mainBannerData.detailBanner.title : '',
  );

  // portpolioId 가 없을때
  useEffect(() => {
    if (!mainBannerId) {
      archiveSelectQeury();
    }
  }, [mainBannerId, archiveSelectQeury]);

  // 뒤로가기 클릭시
  useEffect(() => {
    window.onpopstate = e => {
      history.push('/manage/mainBanner');
    };
  }, [history]);

  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      if (action === 'upload') {
        if (files.length > 0) {
          if (title.value) {
            if (files) {
              await bannerUpload(files);
            }

            const {
              data: { uploadBanner },
            } = await mainBannerUploadMutation({
              variables: {
                title: title.value,
                fileUrl,
                portpolioId: portId,
              },
            });

            _id = uploadBanner._id;
          } else {
            window.alert('Title is required');
          }
        } else {
          window.alert('Main image file is required');
        }
      } else if (action === 'edit') {
        if (files.length > 0 || fileUrl.length > 0) {
          if (title.value) {
            if (files) {
              await bannerUpload(files);
            }

            const {
              data: { modifyBanner },
            } = await mainBannerModifyMutation({
              variables: {
                id: mainBannerId,
                title: title.value,
                fileUrl,
                portpolioId: portId,
              },
            });
            _id = modifyBanner;
          } else {
            window.alert('Title is required');
          }
        } else {
          window.alert('Main image file is required');
        }
      }

      if (_id) {
        if (action === 'edit') {
          window.alert('This Main Banner Edit success');
        } else if (action === 'upload') {
          window.alert('This Main Banner Upload success');
        }
        history.push('/manage/mainBanner');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleMainBannerDelete = async () => {
    try {
      // if (files.length > 0 || fileUrl.length > 0) {
      if (window.confirm('Do you wnat to delete Main Banner?')) {
        setLoading(true);
        const {
          data: { deleteBanner },
        } = await mainBannerDeleteMutation({
          variables: {
            id: mainBannerId,
          },
        });

        if (deleteBanner) {
          window.alert('This Main Banner Delete success');
          history.push('/manage/mainBanner');
        } else {
          window.alert('Failed to delete Main Banner');
        }
      }
      // } else {
      //   window.alert('No images to delete');
      // }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // const handleDelFile = index => {
  //   if (window.confirm('Do you wnat to delete this Img?'))
  //     setFileUrl(file => {
  //       const filesArr = [];
  //       for (let i = 0; i < file.length; i++) {
  //         if (index !== i) {
  //           filesArr.push(file[i]);
  //         }
  //       }
  //       return filesArr;
  //     });
  // };

  return (
    <ManageMainBannerEditPresenter
      title={title}
      filepondEl={filepondEl}
      files={files}
      setFiles={setFiles}
      portId={portId}
      setPortId={setPortId}
      fileUrl={fileUrl}
      setFileUrl={setFileUrl}
      mainBannerData={mainBannerData}
      selectPortpolioData={selectPortpolioData}
      handleUpload={handleUpload}
      handleMainBannerDelete={handleMainBannerDelete}
      // handleDelFile={handleDelFile}
      loading={loading}
    />
  );
};

ManageMainBannerEditContainer.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default ManageMainBannerEditContainer;
