import React from 'react';
import Toggle from 'react-toggle';
import PropTypes from 'prop-types';

const ToggleComponent = ({ defaultChecked, onChange, value, label }) => {
  return (
    <label htmlFor={value}>
      <Toggle
        defaultChecked={defaultChecked}
        onChange={onChange}
        value={value}
      />
      <span id={value}>{label}</span>
    </label>
  );
};

ToggleComponent.defaultProps = {
  defaultChecked: false,
};

ToggleComponent.propTypes = {
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default ToggleComponent;
