import { HttpStatusCode } from "axios";
import { IArticleRepository } from "../../../domain/repositoryInterfaces/article.repository.interface";
import { IUserRepository } from "../../../domain/repositoryInterfaces/user.repository.interface";
import { CustomError } from "../../../domain/utils/custom-error";
import { generalMessages } from "../../../shared/constant/messages/general-messages.constant";
import { IToggleLikeUseCase } from "../../interface/articles/toggle-like-use-case.interface";
import { Article } from "../../../domain/entities/article.entity";
import { IToggleDislikeUseCase } from "../../interface/articles/toggle-dislike-use-case.interface";

export class ToggleDislikeUseCase implements IToggleDislikeUseCase {
  private _userRepo: IUserRepository;
  private _articleRepo: IArticleRepository

  constructor(userRepo: IUserRepository, articleRepo: IArticleRepository) {
    this._userRepo = userRepo;
    this._articleRepo = articleRepo;
  }

  async execute(userId: string, articleId: string): Promise<Article | null> {
    const user = await this._userRepo.findById(userId);
    if(!user) throw new CustomError(generalMessages.ERROR.USER_NOT_FOUND, HttpStatusCode.NotFound);
    
    const article = await this._articleRepo.findById(articleId);
    if(!article) throw new CustomError(generalMessages.ERROR.ARTICLE_NOT_FOUND, HttpStatusCode.NotFound);
   
    if (!article.likedBy) article.likedBy = [];
    if (!article.dislikedBy) article.dislikedBy = [];

    const liked = article.likedBy.some(id => id.toString() === userId);
    const disliked = article.dislikedBy.some(id => id.toString() === userId);

    // remove dislike
    if (disliked) {
      article.dislikedBy = article.dislikedBy!.filter(id => id !== userId);
      article.dislikes = (article.dislikes || 1) - 1;
    } else {
      // add dislike
      article.dislikedBy!.push(userId);
      article.dislikes = (article.dislikes || 0) + 1;

      // remove like if exists
      if (liked) {
        article.likedBy = article.likedBy!.filter(id => id !== userId);
        article.likes = (article.likes || 1) - 1;
      }
    }

    return this._articleRepo.update(article);
  }
}