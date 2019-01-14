
import * as React from 'react';
import S from './App.less';
import { Header } from './Header';

export class App extends React.Component<App.Props> {
  render() {
    return (
      <div className={S.App}>
        <Header/>
      </div>
    );
  }
}

export namespace App {
  export type Props = {
  };
}
