export const RouteConst = {
    AUTH: {
        REGISTER: "/register",
        LOGIN: "/login",
        LOGOUT: "/logout",
        REFRESH: "/refresh"
    },
    CATEGORY: {
        GET_ALL: "/",
    },
    ARTICLE: {
        GET_ALL: "/",
        GET_PERSONALIZED: "/personalized",
        CREATE: "/",
        GET_BY_ID: "/:articleId",
        UPDATE_BY_ID: "/:id",
        DELETE_BY_ID: "/:id",
        GET_BY_CATEGORY_ID: "/category/:id",
        GET_BY_USER_ID: "/user/:id",
        LIKE: "/:articleId/like",
        DISLIKE: "/:articleId/dislike",
        BLOCK: "/:articleId/block",
    }
} as const;
