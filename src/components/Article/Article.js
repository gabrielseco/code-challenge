import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Article.css';

const Article = ({ data, onRemove }) => {
  const removeHandler = () => {
    if (onRemove) {
      onRemove(data);
    }
  };
  const link = `detail/${data.id}`;
  return (
    <section className="article">
      <Link to={link} className="title">
        {data.title}
      </Link>
      <h3 className="author">
        {data.author}
      </h3>
      <p className="excerpt">
        {data.excerpt}
      </p>
      <button onClick={removeHandler}>REMOVE</button>
    </section>
  );
};

Article.propTypes = {
  data: PropTypes.object,
  onRemove: PropTypes.func,
};

export default Article;
