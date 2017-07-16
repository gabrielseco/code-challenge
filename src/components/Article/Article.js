// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Article as IArticle } from './../../types';
import './Article.css';

type Props = {
  data: IArticle,
};

const Article = ({ data }: Props) => {
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
    </section>
  );
};

export default Article;
