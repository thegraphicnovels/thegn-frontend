import React from "react";
import { FilePond, registerPlugin } from "react-filepond";
import styled from "styled-components";
import Input from "Components/Input";
import TextArea from "Components/TextArea";
import Button from "Components/Button";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

const Wrapper = styled.div`
  /* min-height: 20vh; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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

const FilepondPresenter = ({ files, setFiles, title, description }) => {
  return (
    <>
      <FilePond
        acceptedFileTypes={"image/*"}
        files={files}
        allowMultiple={true}
        onupdatefiles={fileItems => {
          setFiles({ file: fileItems.map(fileItem => fileItem.file) });
        }}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        style={{ width: "400px;" }}
      />
      <Wrapper>
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
    </>
  );
};

export default FilepondPresenter;
