import React from "react";
import TextArea from "@atlaskit/textarea";
import PropTypes from "prop-types";

export default ({
  value,
  placeholder,
  isRequired = true,
  isDisabled = false,
  isReadOnly = false,
  maxHeight = "50vh",
  resize = "smart",
  onChange
}) => {
  return (
    <TextArea
      value={value}
      placeholder={placeholder}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      maxHeight={maxHeight}
      resize={resize}
      onChange={onChange}
    />
  );
};

TextArea.propTypes = {
  placeholder: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  maxHeight: PropTypes.string,
  resize: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
