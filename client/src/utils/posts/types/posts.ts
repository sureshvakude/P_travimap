export interface PostImage {
  id: number;
  image: string;
}

export interface PostComment {
  id: number;
  user: number;
  message: string;
  created_at: string;
}

export interface Post {
  id: number;
  user: number;
  name: string;
  caption: string;
  likes: number;
  created_at: string;
  images: PostImage[];
  comments: PostComment[];
}

export interface PostsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}