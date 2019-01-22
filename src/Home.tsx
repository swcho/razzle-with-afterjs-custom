import { Ctx, InjectedProps } from '@jaredpalmer/after';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import S from './Home.less';
import logo from './react.svg';
import { InitialCtx } from './routes';

class Home extends Component<Home.Props> {
  static async getInitialProps(props: InitialCtx): Promise<Home.OwnProps> {
    const {
      req,
      res,
      history,
      location,
      match,
      ...rest
    } = props;
    // console.log('getInitialProps', {
    //   req: !!req, res: !!res, history: !!history, location: !!location, match: !!match, rest});
    return { whatever: 'stuff' };
  }

  render() {
    const {
      whatever,
    } = this.props;
    // console.log('render', this.props);
    return (
      <div className={S.Home}>
        <div className={S.header}>
          <img src={logo} className={S.logo} alt="logo" />
          <h2>Welcome to After.js: {whatever}</h2>
        </div>
        <p className={S.intro}>
          To get started, edit <code>src/Home.js</code> or{' '}
          <code>src/About.js</code>and save to reload.
        </p>
        <Link to="/about">About -></Link>
      </div>
    );
  }
}

namespace Home {
  export type OwnProps = {
    whatever: string;
  };

  export type InitialProps = InitialCtx & OwnProps;

  export type Props = {
    whatever: string;
  } & InjectedProps<InitialProps>;
}

export default withStyles(S)(Home);
