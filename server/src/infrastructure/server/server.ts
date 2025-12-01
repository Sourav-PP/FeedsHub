import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "../../shared/config.constant";
import { errorHandler } from "../../presentation/middleware/error-handler.middleware";
import { AuthRoutes } from "../../presentation/routes/auth.routes";
import { CategoryRoutes } from "../../presentation/routes/category.routes";
import { ArticleRoutes } from "../../presentation/routes/article.routes";

export class Server {
    private _app: Application;

    constructor() {
        this._app = express();
        this.configureMiddleware();
        this.configureRoutes();
        this.configureErrorHandling();
    }

    private configureMiddleware(): void {
        this._app.use(express.json());
        this._app.use(express.urlencoded({ extended: true }));
        this._app.use(cookieParser());
        this._app.use(
            cors({
                origin: config.client.uri,
                credentials: true,
            }),
        );
    }

    private configureRoutes(): void {
        const authRoutes = new AuthRoutes();
        const categoryRoutes = new CategoryRoutes();
        const articleRoutes = new ArticleRoutes();

        this._app.use("/api/auth", authRoutes.route);
        this._app.use("/api/categories", categoryRoutes.route);
        this._app.use("/api/articles", articleRoutes.route);
    }

    private configureErrorHandling(): void {
        this._app.use(errorHandler);
    }

    public start(): void {
        this._app.listen(config.server.port, () => {
            console.log(`Server running on port ${config.server.port}`);
        });
    }

    public get app(): Application {
        return this._app;
    }
}
