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
  likedBy?: string[];
  dislikedBy?: string[];
  blockedBy?: string[];
  createdAt: string;
  updatedAt: string;
}
