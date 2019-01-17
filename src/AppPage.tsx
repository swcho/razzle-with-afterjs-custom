
import * as React from 'react';
import App from './components/App';

export class AppPage extends React.Component<AppPage.Props> {
  render() {
    return (
      <div>
        <App/>
      </div>
    );
  }
}

export namespace AppPage {
  export type Props = {
  };
}

export default AppPage;