import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { tagQuery } from 'apollo/tagQuery';
import {
  archiveDetailQuery,
  archiveUploadQuery,
  archiveModifyQuery,
  archiveDeleteQuery,
} from 'apollo/archiveQuery';
import useInput from 'hook/useInput';
import request from 'superagent';
import { toast } from 'react-toastify';
import ManageArchivePresenter from './ManageArchivePresenter';

const thumbUrl = '';
const fileUrls = [];

const ManageArchiveContainer = ({ history, portpolioId }) => {
  const filepondEl = useRef(null);
  const thumbFilepondEl = useRef(null);
  const [thumbFiles, setThumbFiles] = useState(''); // Thumbnail
  const [files, setFiles] = useState([]); // portpolio
  const [thumbFileUrl, setThumbFileUrl] = useState(thumbUrl); // thumbnail url
  const [fileUrl, setFileUrl] = useState(fileUrls); // portpolio url
  const [tags, setTags] = useState([]); // tag

  // all tag Query
  const [seeTagQuery, { data: tagData }] = useLazyQuery(tagQuery);

  // portpolioId 가 있을시 조회한다.
  const { data: portpolioData } = useQuery(archiveDetailQuery, {
    variables: { id: portpolioId },
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

      setThumbFileUrl(detailPortpolio.thumbImg);
    },
  });

  // portpolioId 가 없을때 tag를 조회하기 위함.
  useEffect(() => {
    if (!portpolioId) {
      seeTagQuery();
    }
  }, [portpolioId, seeTagQuery]);

  // archiveUpload Query
  const [archiveUploadMutation] = useMutation(archiveUploadQuery);
  // archiveModify Query
  const [archiveModifyMutation] = useMutation(archiveModifyQuery);
  // archiveModify Query
  const [archiveDeleteMutation] = useMutation(archiveDeleteQuery);

  const title = useInput(
    portpolioData ? portpolioData.detailPortpolio.title : '',
  );
  const description = useInput(
    portpolioData ? portpolioData.detailPortpolio.description : '',
  );

  // Cloudinary upload Function
  const portpolioUpload = async (fileArr, kind) => {
    let preset = '';
    if (kind === 'post') {
      preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_POST_PRESET;
    } else if (kind === 'thumbnail') {
      preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_THUMBNAIL_PRESET;
    }
    for (let i = 0; i < fileArr.length; i++) {
      const url = request
        .post(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL)
        .field('upload_preset', preset)
        .field('file', fileArr[i])
        .then(async response => {
          const {
            body: { secure_url: secureUrl },
          } = response;
          if (secureUrl) return secureUrl;
          return '';
        });

      if (kind === 'post') {
        setFileUrl(file => {
          file.push(url);
          return file;
        });
      } else if (kind === 'thumbnail') {
        setThumbFileUrl(url);
      }
    }
  };

  const handleUpload = async action => {
    let _id;
    try {
      if (files) {
        await portpolioUpload(files, 'post');
      }
      if (thumbFiles) {
        await portpolioUpload(thumbFiles, 'thumbnail');
      }
      if (action === 'upload') {
        if (title.value !== '' && files && files.length > 0) {
          const {
            data: { uploadPortpolio },
          } = await archiveUploadMutation({
            variables: {
              title: title.value,
              description: description.value,
              thumbFileUrl,
              fileUrl,
              tags,
            },
          });

          _id = uploadPortpolio._id;
        } else {
          toast.error('Title & File is required');
        }
      } else if (action === 'edit') {
        if (title.value !== '') {
          const {
            data: { modifyPortpolio },
          } = await archiveModifyMutation({
            variables: {
              id: portpolioId,
              title: title.value,
              description: description.value,
              thumbFileUrl,
              fileUrl,
              tags,
            },
          });
          _id = modifyPortpolio;
        } else {
          toast.error('Title is required');
        }
      }
      if (_id) {
        toast.success(`Portpolio ${action} success`, {
          autoClose: 3000,
          onClose: () => history.push(`/archiveDetail/${_id}`),
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteArchive = async id => {
    try {
      const {
        data: { deletePortpolio },
      } = await archiveDeleteMutation({
        variables: {
          id,
        },
      });

      if (deletePortpolio) {
        toast.success('This archive Delete success');
      } else {
        toast.error('Failed to delete archive');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUseTag = e => {
    if (e.target.checked === true) {
      setTags([...tags, e.target.value]);
    } else {
      const newTag = tags;
      newTag.splice(tags.indexOf(e.target.value), 1);
      setTags(newTag);
    }
  };

  const handleDelFile = index => {
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
    <ManageArchivePresenter
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
    />
  );
};

ManageArchiveContainer.defaultProps = {
  portpolioId: '',
};

ManageArchiveContainer.propTypes = {
  history: PropTypes.object.isRequired,
  portpolioId: PropTypes.string,
};

export default ManageArchiveContainer;
