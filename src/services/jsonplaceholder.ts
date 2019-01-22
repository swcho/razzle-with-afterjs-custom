
const BASE_URL = 'https://jsonplaceholder.typicode.com';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const getPosts = () => fetch(`${BASE_URL}/posts`).then<Post[]>((resp) => resp.json());