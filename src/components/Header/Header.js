import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';

const Header = props => (
  <header className="header fixed" onClick={() => props.history.push('/')}>
    <Link to="/">
      <h2 className="title">{props.title}</h2>
    </Link>
  </header>
);

Header.defaultProps = {
  title: 'Billin',
};

Header.propTypes = {
  title: PropTypes.string
};


export default withRouter(Header);
