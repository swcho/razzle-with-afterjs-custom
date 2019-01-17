
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { withViewport } from '@storybook/addon-viewport';
import { addDecorator, configure, setAddon } from '@storybook/react';

addDecorator(
  withInfo({
    // styles: {
    //   header: {
    //     h1: {
    //       marginRight: '20px',
    //       fontSize: '25px',
    //       display: 'inline',
    //     },
    //     body: {
    //       paddingTop: 0,
    //       paddingBottom: 0,
    //     },
    //     h2: {
    //       display: 'inline',
    //       color: '#999',
    //     },
    //   },
    //   infoBody: {
    //     backgroundColor: '#eee',
    //     padding: '0px 5px',
    //     lineHeight: '2',
    //   },
    // },
    inline: true,
    source: true,
  })
);
addDecorator(withKnobs);
addDecorator(withViewport());

import './blueprints/index.stories'; 
