import React from "react";
import Textfield from "@atlaskit/textfield";
import PropTypes from "prop-types";

const Input = ({
  value,
  placeholder,
  isRequired = true,
  isDisabled = false,
  isReadOnly = false,
  autoFocus = false,
  onChange
}) => {
  return (
    <Textfield
      value={value}
      placeholder={placeholder}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      autoFocus={autoFocus}
      onChange={onChange}
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default Input;
