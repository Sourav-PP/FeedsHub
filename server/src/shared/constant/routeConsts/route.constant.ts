export const RouteConst = {
    AUTH: {
        REGISTER: "/register",
        LOGIN: "/login",
        LOGOUT: "/logout",
        REFRESH: "/refresh",
        UPDATE_PROFILE: "/profile",
        CHANGE_PASSWORD: "/change-password",
        FETCH_PROFILE: "/profile",
    },
    CATEGORY: {
        GET_ALL: "/",
    },
    ARTICLE: {
        GET_ALL: "/",
        GET_PERSONALIZED: "/personalized",
        CREATE: "/",
        GET_BY_ID: "/:articleId",
        UPDATE_BY_ID: "/:articleId",
        DELETE_BY_ID: "/:articleId",
        GET_BY_CATEGORY_ID: "/category/:id",
        GET_BY_USER_ID: "/user",
        LIKE: "/:articleId/like",
        DISLIKE: "/:articleId/dislike",
        BLOCK: "/:articleId/block",
    }
} as const;
