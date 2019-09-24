import React, { Component } from "react";
import UploadTestPresenter from "./UploadTestPresenter";
import { getBase64 } from "../../utils";

class UploadTestContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: "",
      fileList: [],
      uploadUrl: `${process.env.REACT_APP_CLOUDINARY_UPLOAD_URL}?upload_preset=${process.env.REACT_APP_CLOUDINARY_UPLOAD_POST_PRESET}`
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList, uploadUrl } = this.state;
    return (
      <UploadTestPresenter
        previewVisible={previewVisible}
        previewImage={previewImage}
        fileList={fileList}
        uploadUrl={uploadUrl}
        handleCancel={this.handleCancel}
        handlePreview={this.handlePreview}
        handleChange={this.handleChange}
      />
    );
  }
}

export default UploadTestContainer;
