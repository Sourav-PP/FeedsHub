export interface IArticleDTO {
  id: string;
  createdBy: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  likes: number;
  dislikes: number;
  blocks: number;
  createdAt: string;
  updatedAt: string;
}
