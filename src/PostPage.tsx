
import { Ctx, InjectedProps } from '@jaredpalmer/after';
import * as React from 'react';
import { RouteParams } from './routes';
import { getPost, getPosts, Post } from './services/jsonplaceholder';

type InitialCtx = Ctx<RouteParams>;

class PostPage extends React.Component<PostPage.Props> {

  static async getInitialProps(props: InitialCtx): Promise<PostPage.OwnProps> {
    const {
      match: {
        params: {
          postId,
        }
      }
    } = props;
    const post = await getPost(postId);
    return { post };
  }

  static renderPost = (post: Post) => <li key={post.id}>{post.title}</li>;

  render() {
    const {
      post,
    } = this.props;
    return post ? (
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
    ) : (
      <div/>
    );
  }
}

namespace PostPage {
  export type OwnProps = {
    post: Post;
  };

  export type Props = {
  } & InjectedProps<InitialCtx & OwnProps>;
}

export default PostPage;