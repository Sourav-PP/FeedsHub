import { Article } from "../../../domain/entities/article.entity";
import { IArticleRepository } from "../../../domain/repositoryInterfaces/article.repository.interface";
import { IUserRepository } from "../../../domain/repositoryInterfaces/user.repository.interface";
import { IGetArticleByIdUseCase } from "../../interface/articles/get-article-by-id-use-case.interface";

export class GetArticleByIdUseCase implements IGetArticleByIdUseCase {
  private _articleRepo: IArticleRepository;
  private _userRepo: IUserRepository;

  constructor(articleRepo: IArticleRepository, userRepo: IUserRepository) {
    this._articleRepo = articleRepo;
    this._userRepo = userRepo;
  }

  async execute(id: string): Promise<Article | null> {
    const article = await this._articleRepo.findById(id);
    if(!article) return null;
    const createdBy = await this._userRepo.findById(article.createdBy);
    if(!createdBy) return null;

    return { ...article, createdBy: createdBy.firstName + " " + createdBy.lastName };
  }
}