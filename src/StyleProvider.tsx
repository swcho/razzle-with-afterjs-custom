
import PropTypes from 'prop-types';
import * as React from 'react';

export class StyleProvider extends React.Component<StyleProvider.Props> {
  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
  };

  getChildContext() {
    const ret = { insertCss: this.props.insertCss };
    return ret;
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

export namespace StyleProvider {
  export type Props = {
    insertCss: (...styleList: any[]) => void;
  };
}
