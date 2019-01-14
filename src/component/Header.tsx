
import * as React from 'react';
import S from './Header.less';

export class Header extends React.Component<Header.Props> {
  render() {
    return (
      <div className={S.Header}>
        Header
      </div>
    );
  }
}

export namespace Header {
  export type Props = {
  };
}
