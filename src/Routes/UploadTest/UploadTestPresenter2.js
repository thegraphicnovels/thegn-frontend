import React from "react";
import "antd/dist/antd.css";
import { Upload, Icon, Modal } from "antd";
import styled from "styled-components";
import Input from "Components/Input";
import TextArea from "Components/TextArea";
import Button from "Components/Button";

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
  width: 600px;
  margin-bottom: 10px;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius: 0px;
  width: 100%;
  max-width: 600px;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  width: 100%;
  * {
    width: 100%;
    &:not(:last-child) {
      margin-bottom: 7px;
    }
  }
`;

const UploadTestPresenter2 = ({
  previewVisible,
  previewImage,
  fileList,
  uploadUrl,
  title,
  description,
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
      <Form>
        <Input
          placeholder={"title"}
          {...title}
          autoFocus={true}
          isRequired={true}
        />

        <TextArea
          placeholder={"description"}
          {...description}
          resize={"auto"}
        />
        {/* <Input placeholder={"tag"} {...tag} /> */}
        <Button text={"Upload Portpolio"} />
      </Form>
    </Wrapper>
  );
};

export default UploadTestPresenter2;
