import { Category } from "../../../domain/entities/category.entity";

export interface IGetAllCategoriesUseCase {
    execute(): Promise<Category[]>;
}
