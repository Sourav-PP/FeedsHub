export const frontendRoutes = {
  AUTH: {
    SIGNUP: '/signup',
    LOGIN: '/login',
  },
  HOME: '/',
  ARTICLES: '/my-articles',
  ARTICLE_DETAILS: '/article/:articleId',
  CREATE_ARTICLE: '/create-article',
  EDIT_ARTICLE: '/edit-article/:articleId',
  SETTING: '/settings',
} as const;
