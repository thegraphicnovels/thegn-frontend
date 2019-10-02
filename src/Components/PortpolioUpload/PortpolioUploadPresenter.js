import React from "react";
import styled from "styled-components";
import Input from "Components/Input";
import TextArea from "Components/TextArea";
import Button from "Components/Button";
import FilePond from "../FilePond";
import Select from "../Select";
import CheckboxSelect from "../CheckboxSelect";

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
    &:not(:last-child(div)) {
      width: 100%;
    }
    &:not(:last-child) {
      margin-bottom: 7px;
    }
  }
`;

const PortpolioUploadPresenter = ({
  filepondEl,
  selectEl,
  files,
  setFiles,
  title,
  description,
  tagObject,
  handleUpload,
  handleTagSelect,
  portpolioData
}) => {
  return (
    <>
      {!portpolioData && (
        <FilePond filepondEl={filepondEl} files={files} setFiles={setFiles} />
      )}
      <Wrapper>
        {portpolioData && (
          <div style={{ display: "flex", flexdirection: "row" }}>
            {portpolioData.detailPortpolio.files.map(file => (
              <img
                src={file.url}
                alt={portpolioData.detailPortpolio.title}
                key={file._id}
                style={{ width: "500px", height: "500px", padding: "10px" }}
              />
            ))}
          </div>
        )}
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
          <CheckboxSelect
            selectEl={selectEl}
            placeholder={"tag"}
            data={tagObject}
            defaultValue={portpolioData && portpolioData.detailPortpolio.tags}
            onChange={handleTagSelect}
          />
          {/* <Select
            selectEl={selectEl}
            placeholder={"tag"}
            data={tagObject}
            defaultValue={portpolioData && portpolioData.detailPortpolio.tags}
            onChange={handleTagSelect}
          /> */}
          {!portpolioData ? (
            <Button
              text={"Upload Portpolio"}
              onClick={() => handleUpload("upload")}
            />
          ) : (
            <Button
              text={"Edit Portpolio"}
              onClick={() => handleUpload("edit")}
            />
          )}
          {portpolioData && (
            <Button
              type={"danger"}
              text={"Delete Portpolio"}
              onClick={handleUpload}
            />
          )}
        </Form>
      </Wrapper>
    </>
  );
};

export default PortpolioUploadPresenter;
