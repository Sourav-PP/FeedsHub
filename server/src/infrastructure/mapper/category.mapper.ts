import { Category } from "../../domain/entities/category.entity";
import { ICategoryModel } from "../database/models/category.model";

export class CategoryMapper {
    static toDomain(doc: ICategoryModel): Category {
        return {
            id: doc._id.toString(),
            name: doc.name.toLowerCase(),
        };
    }

    static toModel(doc: Partial<Category>): Partial<ICategoryModel> {
        const model: Partial<ICategoryModel> = {};

        if (doc.name !== undefined) model.name = doc.name;

        return model;
    }
}
