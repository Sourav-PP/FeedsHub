import { Category } from "../../../domain/entities/category.entity";
import { ICategoryRepository } from "../../../domain/repositoryInterfaces/category.repository.interface";
import { IGetAllCategoriesUseCase } from "../../interface/category/get-all-categories-use-case.interface";

export class GetAllCategoriesUseCase implements IGetAllCategoriesUseCase {
    private _categoryRepo: ICategoryRepository;

    constructor(categoryRepo: ICategoryRepository) {
        this._categoryRepo = categoryRepo;
    }

    async execute(): Promise<Category[]> {
        return await this._categoryRepo.findAll();
    }
}
