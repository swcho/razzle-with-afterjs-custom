
import { Ctx, InjectedProps } from '@jaredpalmer/after';
import * as React from 'react';
import { RouteParams } from './routes';
import { getPosts, Post } from './services/jsonplaceholder';

type InitialCtx = Ctx<RouteParams>;

class PostPage extends React.Component<PostPage.Props> {

  static async getInitialProps(props: InitialCtx): Promise<PostPage.OwnProps> {
    const posts = await getPosts();
    return { posts };
  }

  static renderPost = (post: Post) => <li key={post.id}>{post.title}</li>;

  render() {
    const {
      posts,
    } = this.props;
    return (
      <div>
        <h1>Post Page</h1>
        <ul>
          {posts.map(PostPage.renderPost)}
        </ul>
      </div>
    );
  }
}

namespace PostPage {
  export type OwnProps = {
    posts: Post[];
  };

  export type Props = {
  } & InjectedProps<InitialCtx & OwnProps>;
}

export default PostPage;