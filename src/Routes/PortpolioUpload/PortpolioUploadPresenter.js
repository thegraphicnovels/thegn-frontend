import React from "react";
import styled from "styled-components";
// import Dropzone from "react-dropzone-uploader";
// import "react-dropzone-uploader/dist/styles.css";
import Input from "Components/Input";
import TextArea from "Components/TextArea";
import Button from "Components/Button";

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
const Dropcontainer = styled.div``;

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius: 0px;
  width: 100%;
  max-width: 800px;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  width: 100%;
  input {
    width: 100%;
    &:not(:last-child) {
      margin-bottom: 7px;
    }
  }
`;

const PostUploadPresenter = ({
  handleFileChangeStatus,
  handleThumbFileChangeStatus,
  handleSubmit,
  title,
  description,
  tag,
  isDragActive,
  getRootProps,
  getInputProps,
  isDragReject,
  acceptedFiles,
  rejectedFiles,
  isFileTooLarge,
  rootRef
}) => {
  return (
    <Section>
      <Dropcontainer {...getRootProps({ refKey: rootRef })}>
        <input {...getInputProps()} />
        {!isDragActive && "Click here or drop a file to upload!"}
        {isDragActive && !isDragReject && "Drop it like it's hot!"}
        {isDragReject && "File type not accepted, sorry!"}
        {isFileTooLarge && (
          <div className="text-danger mt-2">File is too large.</div>
        )}
      </Dropcontainer>
      <div>{}</div>
      {/* <Dropzone
        onChangeStatus={handleFileChangeStatus}
        // onSubmit={handleSubmit}
        // LayoutComponent={Layout}
        maxFiles={5}
        inputContent="Drop 5 Files"
        // inputWithFilesContent={files => `${3 - files.length} more`}
        // submitButtonDisabled={files => files.length < 3}
        accept="image/*,video/*"
        styles={{
          dropzone: {
            margin: 0,
            border: 0,
            backgroundColor: "white",
            width: 300,
            height: 230
          },
          dropzoneActive: { borderColor: "green" }
        }}
      />
      <Dropzone
        onChangeStatus={handleThumbFileChangeStatus}
        maxFiles={1}
        multiple={false}
        inputContent="Drop Thumbnail"
        accept="image/*,video/*"
        styles={{
          dropzone: {
            margin: 0,
            border: 0,
            backgroundColor: "white",
            width: 200,
            height: 110
          },
          dropzoneActive: { borderColor: "green" }
        }}
      /> */}
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
