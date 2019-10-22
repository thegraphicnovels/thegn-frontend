import React from 'react';
import * as ReactToggle from 'react-toggle';
import PropTypes from 'prop-types';
import 'react-toggle/style.css';

const Toggle = ({ key, defaultChecked, onChange, value, label }) => {
  return (
    <label htmlFor={key} key={key}>
      <ReactToggle
        defaultChecked={defaultChecked}
        onChange={onChange}
        value={value}
      />
      <span id={key}>{label}</span>
    </label>
  );
};

Toggle.defaultProps = {
  key: 0,
  defaultChecked: false,
};

Toggle.propTypes = {
  key: PropTypes.any,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
};

export default Toggle;
