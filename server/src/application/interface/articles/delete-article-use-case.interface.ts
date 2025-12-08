export interface IDeleteArticleUseCase {
  execute(id: string): Promise<void>;
}