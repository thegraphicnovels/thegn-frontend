import React from 'react';
import PropTypes from 'prop-types';
import './mapMarker.css';

const Marker = ({ color, name }) => {
  return (
    <div>
      <div
        className="pin bounce"
        style={{ backgroundColor: color, cursor: 'pointer' }}
        title={name}
      />
      <div className="pulse" />
    </div>
  );
};

export default Marker;

Marker.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
