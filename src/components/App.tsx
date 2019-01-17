
import { Alignment, Button, Navbar } from '@blueprintjs/core';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import S from './App.less';

class App extends React.Component<App.Props> {
  render() {
    return (
      <div className={S.App}>
        <Navbar>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>Blueprint</Navbar.Heading>
            <Navbar.Divider />
            <Button className="bp3-minimal" icon="home" text="Home" />
            <Button className="bp3-minimal" icon="document" text="Files" />
          </Navbar.Group>
        </Navbar>
      </div>
    );
  }
}

export namespace App {
  export type Props = {
  };
}

export default withStyles(S)(App);
