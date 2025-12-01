export const RouteConst = {
    AUTH: {
        REGISTER: "/register",
        LOGIN: "/login",
        REFRESH: "/refresh"
    },
    CATEGORY: {
        GET_ALL: "/",
    },
    ARTICLE: {
        GET_ALL: "/",
        CREATE: "/",
        GET_BY_ID: "/:id",
        UPDATE_BY_ID: "/:id",
        DELETE_BY_ID: "/:id",
        GET_BY_CATEGORY_ID: "/category/:id",
        GET_BY_USER_ID: "/user/:id",
        LIKE: "/like/:id",
        DISLIKE: "/dislike/:id",
        BLOCK: "/block/:id",
    }
} as const;
