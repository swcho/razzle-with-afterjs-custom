import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React, { Component } from 'react';
import S from './About.less';

class About extends Component {
  render() {
    return <div className={S.About}>about!</div>;
  }
}

export default withStyles(S)(About);
