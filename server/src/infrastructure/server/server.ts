import express, { Application } from "express";
import cors from "cors";
import { config } from "../../shared/config.constant";
import { errorHandler } from "../../presentation/middleware/error-handler.middleware";
import { AuthRoutes } from "../../presentation/routes/auth.routes";
import { CategoryRoutes } from "../../presentation/routes/category.routes";

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

        this._app.use("/api/users", authRoutes.route);
        this._app.use("/api/categories", categoryRoutes.route);
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
