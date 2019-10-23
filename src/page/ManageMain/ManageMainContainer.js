import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { archiveSelectQuery, archiveDetailQuery } from 'apollo/archiveQuery';
import request from 'superagent';
import {
  mainArchiveUploadQuery,
  mainArchiveModifyQuery,
  mainArchiveDeleteQuery,
} from 'apollo/mainArchiveQuery';
import ManageMainPresenter from './ManageMainPresenter';

const ManageMainContainer = ({
  history,
  match: {
    params: { portpolioId },
  },
}) => {
  const filepondEl = useRef(null);
  const [files, setFiles] = useState([]); // mainfile
  const [fileUrl, setFileUrl] = useState([]); // mainfile url
  const [portId, setPortId] = useState(portpolioId);

  const { data: portpolioData } = useQuery(archiveDetailQuery, {
    variables: { id: portpolioId },
    fetchPolicy: 'network-only',
    skip: !portpolioId, // portpolioId가 없으면 건너뛴다.
    onCompleted: ({ detailPortpolio }) => {
      const { mainImg } = detailPortpolio;
      console.log(mainImg);
      if (mainImg) {
        const fileArr = [];
        for (let i = 0; i < mainImg.length; i++) {
          fileArr.push(mainImg[i]);
        }
        setFileUrl(fileArr);
      }
      setPortId(detailPortpolio._id);
    },
  });

  const { data: selectPortpolioData } = useQuery(archiveSelectQuery, {
    variables: { id: portpolioId },
    fetchPolicy: 'network-only',
    skip: portpolioId, // portpolioId가 있으면 건너뛴다.
  });

  const [mainArchiveUploadMutation] = useMutation(mainArchiveUploadQuery);
  const [mainArchiveModifyMutation] = useMutation(mainArchiveModifyQuery);
  const [mainArchiveDeleteMutation] = useMutation(mainArchiveDeleteQuery);

  // Cloudinary upload Function
  const portpolioUpload = async fileArr => {
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
              await portpolioUpload(files, 'post');
            }

            const {
              data: { uploadPortpolio },
            } = await mainArchiveUploadMutation({
              variables: {
                fileUrl,
                portpolioId: portId,
              },
            });

            _id = uploadPortpolio._id;
          } else {
            window.alert('Choose Connection Portfolio');
          }
        } else {
          window.alert('Main image file is required');
        }
      } else if (action === 'edit') {
        if (files.length > 0 || fileUrl.length > 0) {
          const {
            data: { modifyPortpolio },
          } = await mainArchiveModifyMutation({
            variables: {
              fileUrl,
              portpolioId: portId,
            },
          });
          _id = modifyPortpolio;
        } else {
          window.alert('Main image file is required');
        }
      }

      if (_id) {
        history.push(`/archiveDetail/${_id}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleMainArchiveDelete = async id => {
    try {
      if (files.length > 0 || fileUrl.length > 0) {
        if (window.confirm('Do you wnat to delete Main Img?')) {
          const {
            data: { deletePortpolio },
          } = await mainArchiveDeleteMutation({
            variables: {
              portpolioId: id,
            },
          });

          if (deletePortpolio) {
            window.alert('This archive main Img Delete success');
            history.push('/');
          } else {
            window.alert('Failed to delete archive main Img');
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
    <ManageMainPresenter
      filepondEl={filepondEl}
      files={files}
      setFiles={setFiles}
      setPortId={setPortId}
      fileUrl={fileUrl}
      portpolioData={portpolioData}
      selectPortpolioData={selectPortpolioData}
      handleUpload={handleUpload}
      handleMainArchiveDelete={handleMainArchiveDelete}
      handleDelFile={handleDelFile}
    />
  );
};

ManageMainContainer.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default ManageMainContainer;
