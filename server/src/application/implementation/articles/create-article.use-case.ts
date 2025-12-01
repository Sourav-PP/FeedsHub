import { Article } from "../../../domain/entities/article.entity";
import { IArticleRepository } from "../../../domain/repositoryInterfaces/article.repository.interface";
import { IFileStorage } from "../../../domain/services/file-storage.interface";
import { ICreateArticleDTO } from "../../dto/article.dto";
import { ICreateArticleUseCase } from "../../interface/articles/create-article-use-case.interface";

export class CreateArticleUseCase implements ICreateArticleUseCase {
    private _articleRepo: IArticleRepository;
    private _fileStorage: IFileStorage;
    constructor(articleRepo: IArticleRepository, fileStorage: IFileStorage) {
        this._articleRepo = articleRepo;
        this._fileStorage = fileStorage;
    }

    async execute(data: ICreateArticleDTO): Promise<Article> {
        const cloudURL = await this._fileStorage.upload(data.file.buffer, data.file.originalname, "articles");
        const normalizedName = data.title.trim().toLowerCase();

        return await this._articleRepo.create({
            title: normalizedName,
            description: data.description,
            image: cloudURL,
            tags: data.tags,
            category: data.category,
            createdBy: data.createdBy,
        });
    }
}
