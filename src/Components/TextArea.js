import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.textarea`
  border: 0;
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.bgColor};
  height: 217px;
  width: 319px;
  font-size: 12px;
  padding: 0px 15px;
  resize: none;
  &::placeholder {
    padding-top: 10px;
  }
`;

const TextArea = ({
  placeholder,
  required = false,
  value,
  onChange,
  //   type = "text",
  className
}) => (
  <Container
    className={className}
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    // type={type}
  />
);

TextArea.propTypes = {
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
  //   type: PropTypes.string
};

export default TextArea;
