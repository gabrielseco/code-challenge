// @flow
import React from 'react';
import { Article as IArticle } from './../../types';
import './Article.css';

const Article = ({ data }: { data: IArticle }) => (
  <section className="article">
    <h2 className="title">{data.title}</h2>
    <h3 className="author">{data.author}</h3>
    <p className="excerpt">{data.excerpt}</p>
  </section>
);

export default Article;
