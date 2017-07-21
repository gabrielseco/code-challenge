import { ARTICLES_QUERY, ARTICLE_QUERY, ARTICLE_DELETE_QUERY } from './queries';

const ARTICLES_QUERY_MOCK = `{
  articles {
    author,
    excerpt,
    id,
    title,
  }
}`;

const ARTICLE_QUERY_MOCK = `{
  articles(id: "XX0405995") {
    author,
    content,
    published,
    title,
    tags
  }
}`;

const ARTICLE_DELETE_QUERY_MOCK = `
  mutation delete { 
    deleteArticle(id: "XX0405995") {
      id,
      author,
      content,
      published,
      title,
      tags
    }
}`;

describe('Queries suite', () => {
  it('should return the ARTICLES_QUERY', () => {
    expect(ARTICLES_QUERY).toEqual(ARTICLES_QUERY_MOCK);
  });

  it('should return the ARTICLE_QUERY', () => {
    expect(ARTICLE_QUERY('XX0405995')).toEqual(ARTICLE_QUERY_MOCK);
  });

  it('should return the ARTICLE_DELETE_QUERY', () => {
    expect(ARTICLE_DELETE_QUERY({ id: 'XX0405995' })).toEqual(ARTICLE_DELETE_QUERY_MOCK);
  });
});
