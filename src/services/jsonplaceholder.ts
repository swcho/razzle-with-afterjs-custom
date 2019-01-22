
const BASE_URL = 'https://jsonplaceholder.typicode.com';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const getPosts = () => fetch(`${BASE_URL}/posts`).then<Post[]>((resp) => resp.json());

export const getPost = (id: number | string) => fetch(`${BASE_URL}/posts/${id}`).then<Post>((resp) => resp.json());