import React from "react";
import { CheckboxSelect } from "@atlaskit/select";
import PropTypes from "prop-types";

export default ({ defaultValue, data, placeholder, onChange }) => {
  console.log(defaultValue && defaultValue[0].value);
  return (
    <CheckboxSelect
      defaultValue={
        defaultValue &&
        data.filter(option => {
          console.log(option);
          return option.label === "Yaya";
        })
      }
      options={data}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

CheckboxSelect.propTypes = {
  data: PropTypes.array,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
