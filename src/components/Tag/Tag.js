import React from 'react';
import PropTypes from 'prop-types';
import './Tag.css';

const Tag = props => (
  <div className="tag" style={{ backgroundColor: props.color }}>
    <p>{props.name}</p>
  </div>
);

Tag.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default Tag;
