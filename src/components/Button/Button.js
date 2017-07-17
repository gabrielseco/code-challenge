import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './Button.css';

const Button = props => {
  const onClick = () => {
    if (props.onClick) {
      props.onClick({
        ...props,
      });
    }
  };
  return (
    <button className="button" onClick={onClick}>
      <FontAwesome size={props.size} name={props.icon} />
    </button>
  );
};

Button.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
};

export default Button;
