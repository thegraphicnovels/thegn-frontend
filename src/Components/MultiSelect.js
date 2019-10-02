import React from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";

const MultiSelect = ({ data, defaultValue }) => {
  return <DropdownTreeSelect data={data} />;
};

export default MultiSelect;
