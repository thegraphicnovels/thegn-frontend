import React from "react";
import "antd/dist/antd.css";
import { Upload, Icon, Modal } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
  /* min-height: 20vh; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fafafa;
  border: 1px solid;
  border-radius: 2px;
  /* border-style: dashed; */
  color: #bdbdbd;
  outline: none;
  /* transition: border 0.24s ease-in-out; */
  width: 400px;
`;

const UploadTestPresenter = ({
  previewVisible,
  previewImage,
  fileList,
  uploadUrl,
  handleCancel,
  handlePreview,
  handleChange
}) => {
  return (
    <Wrapper>
      <Container>
        <Upload
          action={uploadUrl}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          accept={"image/*"}
          multiple={true}
        >
          {fileList && fileList.length >= 8 ? null : (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">Portpolio</div>
            </div>
          )}
        </Upload>
      </Container>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </Wrapper>
  );
};

export default UploadTestPresenter;
