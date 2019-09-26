import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

export default ({
  type = "primary",
  loading = false,
  text = "Button",
  onClick,
  size,
  disabled = false,
  style
}) => {
  return (
    <Button
      type={type}
      size={size}
      loading={loading}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {text}
    </Button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  loading: PropTypes.bool,
  text: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object
};
