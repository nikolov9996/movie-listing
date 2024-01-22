export type CommentType = {
  author: string;
  comment: string;
  rating: number;
};

export type MovieType = {
  creator?: string;
  title?: string;
  rating?: number;
  comments?: CommentType[];
  description?: string;
  image?: string;
  genre?: string;
};

export type CreateMovieType = {
  creator?: string;
  title?: string;
  description?: string;
  image?: string;
  genre?: string;
};
