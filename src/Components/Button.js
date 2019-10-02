import React from "react";
import Button from "@atlaskit/button";
import PropTypes from "prop-types";

// Button Types
// 'default',
// 'primary',
// 'link',
// 'subtle',
// 'subtle-link',
// 'warning',
// 'danger',

export default ({
  text,
  type = "primary",
  isDisabled = false,
  isLoading = false,
  onClick
}) => (
  <Button
    appearance={type}
    isDisabled={isDisabled}
    isLoading={isLoading}
    onClick={onClick}
  >
    {text}
  </Button>
);

Button.propTypes = {
  appearance: PropTypes.string,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};
