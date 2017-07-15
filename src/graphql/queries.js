// @flow
export const ARTICLES_QUERY = `{
  articles {
    author,
    excerpt,
    id,
    title,
  }
}`;

export const ARTICLE_QUERY = (id: string) => `{
  articles(id: "${id}") {
    author,
    content,
    published,
    title,
    tags
  }
}`;
