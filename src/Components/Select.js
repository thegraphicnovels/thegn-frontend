import React from "react";
import Select from "react-select";
// import "react-select/dist/react-select.css";

export default ({ selectEl, data, defaultValue, placeholder, onChange }) => (
  <Select
    ref={selectEl}
    defaultValue={
      defaultValue &&
      data.filter(option => defaultValue.map(tag => tag.value === option.label))
    }
    isMulti
    name="colors"
    options={data}
    placeholder={placeholder}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange={onChange}
  />
);
