import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
const { TextArea } = Input;

export default ({ onChange, placeholder, minRows = 3, maxRows = 5, value }) => {
  return (
    <TextArea
      onChange={onChange}
      placeholder={placeholder}
      autosize={{ minRows, maxRows }}
      value={value}
    />
  );
};

TextArea.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  minRows: PropTypes.number,
  maxRows: PropTypes.number
};
