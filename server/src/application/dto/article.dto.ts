export interface ICreateArticleDTO {
  title: string;
  createdBy: string;
  description: string;
  file:  Express.Multer.File;
  tags: string[];
  category: string;
}

export interface IArticleDetails {
  id: string;
  createdBy: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  likes?: number;
  dislikes?: number;
  blocks?: number;
  createdAt?: Date;
  updatedAt?: Date;
}