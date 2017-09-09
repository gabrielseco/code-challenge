import {
  ARTICLES_QUERY,
  ARTICLE_QUERY,
  ARTICLE_FULL_FIELDS,
  ARTICLE_CREATE_QUERY,
  ARTICLE_EDIT_QUERY,
  ARTICLE_DELETE_QUERY,
} from './queries';

const contentMock = JSON.stringify('Test');

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

const ARTICLE_FULL_FIELDS_MOCK = `{
  articles(id: "XX0405995") {
    id,
    author,
    content,
    excerpt,
    published,
    title,
    tags
  }
}`;

const ARTICLE_CREATE_QUERY_MOCK = `
  mutation newArticle {
    createArticle(article: {
      title: "Avicii",
      author: "Tim Berg",
      excerpt: ${contentMock},
      content: ${contentMock},
      published: true,
      tags: "React,GraphQL",
    }){
      id,
      title,
      author,
      excerpt,
    }
}
`;

const ARTICLE_EDIT_QUERY_MOCK = `
  mutation editArticle {
    updateArticle(article: {
      id: "1234",
      title: "Avicii",
      author: "Tim Berg",
      excerpt: ${contentMock},
      content: ${contentMock},
      published: true,
      tags: "React,GraphQL",
    }){
      id,
      title,
      author,
      excerpt,
    }
  }
`;

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

  it('should return the ARTICLE_FULL_FIELDS', () => {
    expect(ARTICLE_FULL_FIELDS('XX0405995')).toEqual(ARTICLE_FULL_FIELDS_MOCK);
  });

  it('should return the ARTICLE_CREATE_QUERY', () => {
    expect(
      ARTICLE_CREATE_QUERY({
        title: 'Avicii',
        author: 'Tim Berg',
        excerpt: contentMock,
        content: contentMock,
        published: true,
        tags: ['React', 'GraphQL'],
      }),
    ).toEqual(ARTICLE_CREATE_QUERY_MOCK);
  });

  it('should return the ARTICLE_EDIT_QUERY', () => {
    expect(
      ARTICLE_EDIT_QUERY({
        id: '1234',
        title: 'Avicii',
        author: 'Tim Berg',
        excerpt: contentMock,
        content: contentMock,
        published: true,
        tags: ['React', 'GraphQL'],
      }),
    ).toEqual(ARTICLE_EDIT_QUERY_MOCK);
  });

  it('should return the ARTICLE_DELETE_QUERY', () => {
    expect(ARTICLE_DELETE_QUERY('XX0405995')).toEqual(
      ARTICLE_DELETE_QUERY_MOCK,
    );
  });
});
