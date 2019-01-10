import { AfterRenderProps } from '@jaredpalmer/after';
import React, { Component } from 'react';
import { RouteChildrenProps } from 'react-router';
import { Link } from 'react-router-dom';
import './Home.css';
import logo from './react.svg';

type InitialProps = AfterRenderProps<{}> & RouteChildrenProps;

class Home extends Component<Home.Props> {
  static async getInitialProps({ req, res, match, history, location, ...ctx }: InitialProps): Promise<Home.Props> {
    return { whatever: 'stuff' };
  }

  render() {
    const {
      whatever,
    } = this.props;
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to After.js: {whatever}</h2>
        </div>
        <p className="Home-intro">
          To get started, edit <code>src/Home.js</code> or{' '}
          <code>src/About.js</code>and save to reload.
        </p>
        <Link to="/about">About -></Link>
      </div>
    );
  }
}

namespace Home {
  export type Props = {
    whatever: string;
  };
}

export default Home;
