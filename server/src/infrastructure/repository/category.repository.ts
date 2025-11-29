import { Category } from "../../domain/entities/category.entity";
import { ICategoryRepository } from "../../domain/repositoryInterfaces/category.repository.interface";
import { CategoryModel, ICategoryModel } from "../database/models/category.model";
import { CategoryMapper } from "../mapper/category.mapper";
import { BaseRepository } from "./base.repository";

export class CategoryRepository extends BaseRepository<Category, ICategoryModel> implements ICategoryRepository {
    constructor() {
        super(CategoryModel, CategoryMapper.toDomain, CategoryMapper.toModel);
    }

    async findAll(): Promise<Category[]> {
        const doc = await CategoryModel.find();
        return this._toDomainArray(doc);
    }
}
