import { IArticleRepository } from "../../../domain/repositoryInterfaces/article.repository.interface";
import { IDeleteArticleUseCase } from "../../interface/articles/delete-article-use-case.interface";

export class DeleteArticleUseCase implements IDeleteArticleUseCase {
  private _articleRepo: IArticleRepository
  constructor(articleRepo: IArticleRepository) {
    this._articleRepo = articleRepo

  }

  async execute(id: string): Promise<void> {
    await this._articleRepo.deleteById(id);
  }
}