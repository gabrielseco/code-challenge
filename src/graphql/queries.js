export const ARTICLES_QUERY = `{
  articles {
    author,
    excerpt,
    id,
    title,
  }
}`;

export const ARTICLE_QUERY = id => `{
  articles(id: "${id}") {
    author,
    content,
    published,
    title,
    tags
  }
}`;


export const ARTICLE_DELETE_QUERY = id => `
  mutation delete { 
    deleteArticle(id: "${id}") {
      id,
      author,
      content,
      published,
      title,
      tags
    }
}`;
