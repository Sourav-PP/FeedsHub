export interface ICreateArticleDTO {
  title: string;
  createdBy: string;
  description: string;
  file:  Express.Multer.File;
  tags: string[];
  category: string;
}