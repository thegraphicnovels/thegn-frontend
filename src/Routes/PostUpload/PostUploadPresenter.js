import React from "react";
import styled from "styled-components";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import Input from "../../Components/Input";
import TextArea from "../../Components/TextArea";
import Button from "../../Components/Button";

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

// const PreviewContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: row;
// `;

// const CustomDropzone = styled.div`
//   padding: 200px;
//   padding-bottom: 30px;
//   margin-bottom: 15px;
// `;

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius: 0px;
  width: 100%;
  max-width: 800px;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  width: 100%;
  input {
    width: 100%;
    &:not(:last-child) {
      margin-bottom: 7px;
    }
  }
`;

const PostUploadPresenter = ({
  handleChangeStatus,
  handleSubmit,
  title,
  description,
  tag
}) => {
  return (
    <Section>
      <Dropzone
        onChangeStatus={handleChangeStatus}
        // onSubmit={handleSubmit}
        // LayoutComponent={Layout}
        maxFiles={3}
        inputContent="Drop 3 Files"
        // inputWithFilesContent={files => `${3 - files.length} more`}
        // submitButtonDisabled={files => files.length < 3}
        accept="image/*,video/*"
        styles={{
          dropzone: {
            margin: 0,
            border: 0,
            backgroundColor: "white",
            width: 500,
            height: 400
          },
          dropzoneActive: { borderColor: "green" }
        }}
      />
      <Wrapper>
        <Form>
          <Input placeholder={"title"} {...title} />
          <TextArea placeholder={"description"} {...description} />
          <Input placeholder={"tag"} {...tag} />
          <Button text={"Upload Post"} onClick={handleSubmit} />
        </Form>
      </Wrapper>
    </Section>
  );
};

export default PostUploadPresenter;
