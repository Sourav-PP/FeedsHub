import mongoose from "mongoose";
import { config } from "../../../shared/config.constant";

export class MongoConnect {
    private _mongoUrl: string;

    constructor() {
        this._mongoUrl = config.database.mongoDb;
    }

    connect() {
        mongoose
            .connect(this._mongoUrl)
            .then(() => console.log("Connected to mongoDb"))
            .catch(e => console.log(e));
    }
}
