import { Server } from "./infrastructure/server/server";
import { MongoConnect } from "./infrastructure/database/mongoDB/mongo-connect";

async function bootstrap() {
    const mongo = new MongoConnect();
    await mongo.connect();

    const server = new Server();
    server.start();
}

bootstrap();
