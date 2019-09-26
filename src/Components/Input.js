import React from "react";
import { Input } from "antd";
import PropTypes from "prop-types";

export default ({ onChange, placeholder, style, size = "default", value }) => {
  return (
    <Input
      placeholder={placeholder}
      onChange={onChange}
      style={style}
      size={size}
      value={value}
    />
  );
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.string
};
