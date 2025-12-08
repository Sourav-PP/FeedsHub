export const articleRoutes = {
  create: '/articles',
  getPersonalized: '/articles/personalized',
  getDetails: '/articles/:articleId',
  getByUserId: '/articles/user',
  like: '/articles/:articleId/like',
  dislike: '/articles/:articleId/dislike',
  block: '/articles/:articleId/block',
  edit: '/articles/:articleId',
  delete: '/articles/:articleId',
} as const;
