import React from 'react';
import PropTypes from 'prop-types';
import './Tag.css';

const Tag = props => {
  const renderCloseTag = () => {
    if (props.onRemove) {
      return <span className="delete-icon" />;
    }
    return null;
  };
  const removeTag = () => {
    if (props.onRemove) props.onRemove(props);
  };
  return (
    <div
      className="tag"
      onClick={removeTag}
      style={{ backgroundColor: props.color }}
    >
      {renderCloseTag()}
      <p>
        {props.name}
      </p>
    </div>
  );
};

Tag.propTypes = {
  color: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
};

export default Tag;
