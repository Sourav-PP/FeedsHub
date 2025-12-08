import { HttpStatusCode } from "axios";
import { Article } from "../../../domain/entities/article.entity";
import { IArticleRepository } from "../../../domain/repositoryInterfaces/article.repository.interface";
import { IUserRepository } from "../../../domain/repositoryInterfaces/user.repository.interface";
import { CustomError } from "../../../domain/utils/custom-error";
import { generalMessages } from "../../../shared/constant/messages/general-messages.constant";
import { IEditArticleUseCase } from "../../interface/articles/edit-article-use-case.interface";
import { ICreateArticleDTO } from "../../dto/article.dto";
import { IFileStorage } from "../../../domain/services/file-storage.interface";

export class EditArticleUseCase implements IEditArticleUseCase {
  private _articleRepo: IArticleRepository;
  private _userRepo: IUserRepository;
  private _fileStorage: IFileStorage;

  constructor(articleRepo: IArticleRepository, userRepo: IUserRepository, fileStorage: IFileStorage) {
    this._articleRepo = articleRepo;
    this._userRepo = userRepo;
    this._fileStorage = fileStorage;
  }

  async execute(id: string, data: ICreateArticleDTO): Promise<Article> {
    console.log('data: ', data);
    const article = await this._articleRepo.findById(id);
    if (!article) throw new CustomError(generalMessages.ERROR.ARTICLE_NOT_FOUND, HttpStatusCode.NotFound);

    let imageURL = article.image;

    if (data.file) {
        imageURL = await this._fileStorage.upload(
            data.file.buffer, 
            data.file.originalname, 
            "articles"
        );
    }

    const { file, ...updateFields } = data;

    const updatedArticle = { 
        ...article, 
        ...updateFields,
        image: imageURL,
    };
    
    console.log('updatedArticle:', updatedArticle);
    const updated = await this._articleRepo.update(updatedArticle);
    if(!updated) throw new CustomError(generalMessages.ERROR.ARTICLE_NOT_FOUND, HttpStatusCode.NotFound);
    console.log('updated:', updated);
    return updated;
  }
}