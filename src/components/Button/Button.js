// @flow

import React from 'react';
import FontAwesome from 'react-fontawesome';
import './Button.css';

type Props = {
  icon: string,
  onClick: Function,
  size?: string,
};

const Button = (props: Props) => {
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

export default Button;
