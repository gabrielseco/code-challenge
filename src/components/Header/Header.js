// @flow
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';

type Props = {
  title: string,
  history: any,
};

const Header = (props: Props) => (
  <header className="header fixed" onClick={() => props.history.push('/')}>
    <Link to="/">
      <h2 className="title">{props.title}</h2>
    </Link>
  </header>
);

Header.defaultProps = {
  title: 'Billin',
};


export default withRouter(Header);
