// @flow
import React from 'react';
import './Header.css';

const Header = (props: { title: string }) => (
  <header className="header fixed">
    <h2 className="title">{props.title}</h2>
  </header>
);

Header.defaultProps = {
  title: 'Billin',
};

export default Header;
