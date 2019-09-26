import React, { useState } from "react";
import UploadTestPresenter2 from "./UploadTestPresenter2";
import { useInput, useDidUpdate } from "rooks";
import { getBase64 } from "../../utils";

const UploadTestContainer2 = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const uploadUrl = `${process.env.REACT_APP_CLOUDINARY_UPLOAD_URL}?upload_preset=${process.env.REACT_APP_CLOUDINARY_UPLOAD_POST_PRESET}`;
  const title = useInput("");
  const description = useInput("");
  let files;

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }) => {
    files = fileList;
    setFileList(files);
  };

  useDidUpdate(() => {
    setFileList(files);
  }, []);

  return (
    <UploadTestPresenter2
      previewVisible={previewVisible}
      previewImage={previewImage}
      fileList={fileList}
      uploadUrl={uploadUrl}
      title={title}
      description={description}
      handleCancel={handleCancel}
      handlePreview={handlePreview}
      handleChange={handleChange}
    />
  );
};

export default UploadTestContainer2;
