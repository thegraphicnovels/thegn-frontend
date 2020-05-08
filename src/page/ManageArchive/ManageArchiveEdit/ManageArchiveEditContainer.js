import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { tagQuery } from 'Apollo/tagQuery';
import {
  archiveDetailQuery,
  archiveUploadQuery,
  archiveModifyQuery,
  archiveDeleteQuery,
} from 'Apollo/archiveQuery';
import { useInput } from 'rooks';
import request from 'superagent';
import ManageArchiveEditPresenter from './ManageArchiveEditPresenter';

const ManageArchiveEditContainer = ({
  history,
  match: {
    params: { portpolioId },
  },
}) => {
  const filepondEl = useRef(null);
  const thumbFilepondEl = useRef(null);
  const [thumbFiles, setThumbFiles] = useState([]); // Thumbnail
  const [files, setFiles] = useState([]); // portpolio
  const [thumbFileUrl, setThumbFileUrl] = useState([]); // thumbnail url
  const [fileUrl, setFileUrl] = useState([]); // portpolio url
  const [tags, setTags] = useState([]); // tag

  // all tag Query
  const [seeTagQuery, { data: tagData }] = useLazyQuery(tagQuery, {
    fetchPolicy: 'network-only',
  });

  // portpolioId 가 있을시 조회한다.
  const { data: portpolioData } = useQuery(archiveDetailQuery, {
    variables: { id: portpolioId },
    fetchPolicy: 'network-only',
    skip: !portpolioId, // portpolioId가 없으면 건너뛴다.
    onCompleted: ({ detailPortpolio }) => {
      const dTag = detailPortpolio.tags;
      if (dTag) {
        const tagArr = [];
        for (let i = 0; i < dTag.length; i++) {
          tagArr.push(dTag[i]._id);
        }
        setTags(tagArr);
      }

      // portpolioId가 있을시 해당 portpolio의 tag를 먼저 검색하고 난 뒤
      // tag를 검색하기 위함.
      seeTagQuery();

      const dFile = detailPortpolio.files;
      if (dFile) {
        const fileArr = [];
        for (let i = 0; i < dFile.length; i++) {
          fileArr.push(dFile[i].url);
        }
        setFileUrl(fileArr);
      }

      setThumbFileUrl([detailPortpolio.thumbImg]);
    },
  });

  // portpolioId 가 없을때
  useEffect(() => {
    if (!portpolioId) {
      seeTagQuery();
      setTags([]);
      setThumbFileUrl([]);
      setFileUrl([]);
    }
  }, [portpolioId, seeTagQuery]);

  // 뒤로가기 클릭시
  useEffect(() => {
    window.onpopstate = (e) => {
      history.push('/manage/archive');
    };
  }, [history]);

  const title = useInput(
    portpolioData ? portpolioData.detailPortpolio.title : '',
  );
  const description = useInput(
    portpolioData ? portpolioData.detailPortpolio.description : '',
  );

  // archiveUpload Query
  const [loading, setLoading] = useState(false);
  const [archiveUploadMutation] = useMutation(archiveUploadQuery);
  // archiveModify Query
  const [archiveModifyMutation] = useMutation(archiveModifyQuery);
  // archiveModify Query
  const [archiveDeleteMutation] = useMutation(archiveDeleteQuery);

  // Cloudinary upload Function
  const portpolioUpload = async (fileArr, kind) => {
    let preset = '';
    if (kind === 'post') {
      preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_POST_PRESET;
    } else if (kind === 'thumbnail') {
      preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_THUMBNAIL_PRESET;
    }
    for (let i = 0; i < fileArr.length; i++) {
      const url = await request
        .post(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL)
        .field('upload_preset', preset)
        .field('file', fileArr[i])
        .then(async (response) => {
          const {
            body: { secure_url: secureUrl },
          } = response;

          if (secureUrl) return secureUrl;
          return '';
        });

      if (kind === 'post') {
        setFileUrl((file) => {
          file.push(url);
          return file;
        });
      } else if (kind === 'thumbnail') {
        setThumbFileUrl((file) => {
          file.push(url);
          return file;
        });
      }
    }
  };

  useEffect(() => {
    return () => setLoading(false); // cleanup function을 이용
  }, []);

  const handleUpload = async (action) => {
    let _id;
    setLoading(true);

    try {
      if (action === 'edit') {
        if (
          (thumbFileUrl.length > 0 || thumbFiles.length > 0) &&
          (files.length > 0 || fileUrl.length > 0)
        ) {
          if (title.value !== '') {
            if (window.confirm('Do you want to edit this archive?')) {
              if (files) {
                await portpolioUpload(files, 'post');
              }
              if (thumbFiles) {
                await portpolioUpload(thumbFiles, 'thumbnail');
              }
              const {
                data: { modifyPortpolio },
              } = await archiveModifyMutation({
                variables: {
                  id: portpolioId,
                  title: title.value,
                  description: description.value,
                  thumbFileUrl: thumbFileUrl[0],
                  fileUrl,
                  tags,
                },
              });
              _id = modifyPortpolio;
            }
          } else {
            window.alert('Title is required');
          }
        } else {
          window.alert('Thumbnail & Portpolio is required');
        }
      } else if (action === 'upload') {
        if (files.length > 0 && thumbFiles.length > 0) {
          if (title.value !== '') {
            if (window.confirm('Do you want to upload this archive?')) {
              if (files) {
                await portpolioUpload(files, 'post');
              }
              if (thumbFiles) {
                await portpolioUpload(thumbFiles, 'thumbnail');
              }

              const {
                data: { uploadPortpolio },
              } = await archiveUploadMutation({
                variables: {
                  title: title.value,
                  description: description.value,
                  thumbFileUrl: thumbFileUrl[0],
                  fileUrl,
                  tags,
                },
              });

              _id = uploadPortpolio._id;
            }
          } else {
            window.alert('Title is required');
          }
        } else {
          window.alert('Thumbnail & Portpolio is required');
        }
      }

      if (_id) {
        if (action === 'edit') {
          window.alert('This archive Edit success');
        } else if (action === 'upload') {
          window.alert('This archive Upload success');
        }
        history.push(`/manage/archive`);
      }
    } catch (e) {
      alert(e);
      setLoading(false);
    }
  };

  const handleDeleteArchive = async (id) => {
    try {
      if (window.confirm('This archive Delete?')) {
        setLoading(true);
        const {
          data: { deletePortpolio },
        } = await archiveDeleteMutation({
          variables: {
            id,
          },
        });

        if (deletePortpolio) {
          window.alert('This archive Delete success');
          history.push(`/manage/archive`);
        } else {
          window.alert('Failed to delete archive');
        }
      }
    } catch (e) {
      alert(e);
      setLoading(false);
    }
  };

  const handleUseTag = (e) => {
    if (e.target.checked === true) {
      setTags([...tags, e.target.value]);
    } else {
      const newTag = tags;
      newTag.splice(tags.indexOf(e.target.value), 1);
      setTags(newTag);
    }
  };

  const handleDelFile = (index) => {
    if (window.confirm('Do you wnat to delete this Post?'))
      setFileUrl((file) => {
        const filesArr = [];
        for (let i = 0; i < file.length; i++) {
          if (index !== i) {
            filesArr.push(file[i]);
          }
        }
        return filesArr;
      });
  };

  const findDuplicates = (array, id) => {
    let checked = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i] === id) {
        checked = true;
      }
    }
    return checked;
  };

  return (
    <ManageArchiveEditPresenter
      filepondEl={filepondEl}
      thumbFilepondEl={thumbFilepondEl}
      thumbFiles={thumbFiles}
      setThumbFiles={setThumbFiles}
      files={files}
      setFiles={setFiles}
      thumbFileUrl={thumbFileUrl}
      setThumbFileUrl={setThumbFileUrl}
      fileUrl={fileUrl}
      tagData={tagData}
      tags={tags}
      portpolioData={portpolioData}
      title={title}
      description={description}
      handleUpload={handleUpload}
      handleUseTag={handleUseTag}
      handleDelFile={handleDelFile}
      handleDeleteArchive={handleDeleteArchive}
      findDuplicates={findDuplicates}
      loading={loading}
    />
  );
};

ManageArchiveEditContainer.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default ManageArchiveEditContainer;
