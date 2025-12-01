export interface Article {
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