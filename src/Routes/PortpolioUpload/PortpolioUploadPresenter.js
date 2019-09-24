import React from "react";
import styled from "styled-components";
import Input from "Components/Input";
import TextArea from "Components/TextArea";
import Button from "Components/Button";

const getColor = props => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

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
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  width: 400px;
`;

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16;
  height: 100px;
`;

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2;
  border: 1px solid #eaeaea;
  margin-bottom: 8;
  margin-right: 8;
  width: 100px;
  height: 100px;
  padding: 4;
  box-sizing: border-box;
`;

const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`;

const Img = styled.img`
  display: block;
  width: auto;
  height: 100%;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius: 0px;
  width: 100%;
  max-width: 400px;
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

const PortpolioUploadPresenter = ({
  getRootProps,
  getInputProps,
  isDragActive,
  isDragAccept,
  isDragReject,
  removeFile,
  files,
  title,
  description,
  tag,
  handleSubmit
}) => {
  return (
    <Wrapper>
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </Container>
      <ThumbsContainer>
        {files.map(file => (
          <Thumb key={file.name}>
            <ThumbInner>
              <Img src={file.preview} alt={file.name} />
            </ThumbInner>
            <button onClick={removeFile(file)}>Remove File</button>
          </Thumb>
        ))}
      </ThumbsContainer>
      <Form>
        <Input placeholder={"title"} {...title} />
        <TextArea placeholder={"description"} {...description} />
        <Input placeholder={"tag"} {...tag} />
        <Button text={"Upload Portpolio"} onClick={handleSubmit} />
      </Form>
    </Wrapper>
  );
};

export default PortpolioUploadPresenter;
