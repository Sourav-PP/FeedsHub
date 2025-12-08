import { HttpStatusCode } from "axios";
import { Article } from "../../../domain/entities/article.entity";
import { IArticleRepository } from "../../../domain/repositoryInterfaces/article.repository.interface";
import { IUserRepository } from "../../../domain/repositoryInterfaces/user.repository.interface";
import { CustomError } from "../../../domain/utils/custom-error";
import { generalMessages } from "../../../shared/constant/messages/general-messages.constant";
import { IGetArticleByUserIdUseCase } from "../../interface/articles/get-article-by-user-id-use-case.interface";

export class GetArticleByUserIdUseCase implements IGetArticleByUserIdUseCase {
  private _articleRepo: IArticleRepository;
  private _userRepo: IUserRepository;

  constructor(articleRepo: IArticleRepository, userRepo: IUserRepository) {
    this._articleRepo = articleRepo;
    this._userRepo = userRepo;
  }

  async execute(userId: string, limit: number, skip: number): Promise<{ articles: Article[]; total: number }> {
      const user = await this._userRepo.findById(userId);
      if(!user) {
        throw new CustomError(generalMessages.ERROR.USER_NOT_FOUND, HttpStatusCode.NotFound);
      }
      const article = await this._articleRepo.findByUserId(userId, limit, skip);
      return {
        articles: article,
        total: article.length
      };
  }
}