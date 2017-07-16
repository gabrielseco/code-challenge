import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () =>
  <div className="not-found">
    <p>Page Not Found</p>
    <Link to="/">Back Home</Link>
  </div>;

export default NotFound;
