export const articleRoutes = {
  create: '/articles',
  getPersonalized: '/articles/personalized',
  getDetails: '/articles/:articleId',
  like: '/articles/:articleId/like',
  dislike: '/articles/:articleId/dislike',
  block: '/articles/:articleId/block',
} as const;
