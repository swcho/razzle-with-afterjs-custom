import { Breadcrumb, Breadcrumbs, Button, IBreadcrumbProps, Icon } from '@blueprintjs/core';
import { IconName, IconNames } from '@blueprintjs/icons';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs/react';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react';
import React from 'react';
import '../../main.vendor.less';

console.log('======');

storiesOf('Blueprints', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add('Breadcrumbs', () => {
    const BREADCRUMBS: IBreadcrumbProps[] = [
      { icon: 'folder-close', text: 'Users', onClick: action('Click Users') },
      { icon: 'folder-close', text: 'Janet', onClick: action('Click Janet') },
      { icon: 'document', text: 'image.jpg' },
    ];
    const renderCurrentBreadcrumb = ({ text, ...restProps }: IBreadcrumbProps) => {
        // customize rendering of last breadcrumb
        return <Breadcrumb {...restProps}>{text} <Icon icon="star" /></Breadcrumb>;
    };
    return (
      <Breadcrumbs
          currentBreadcrumbRenderer={renderCurrentBreadcrumb}
          items={BREADCRUMBS}
      />
    );
  })
  .add('Button', () => {
    return (
      <Button
        active={boolean('active', false)}
        alignText={select('alignText', ['left', 'right'], 'center')}
        fill={boolean('fill', false)}
        large={boolean('large', false)}
        small={boolean('small', false)}
        loading={boolean('loading', false)}
        minimal={boolean('minimal', false)}
        icon={select('icon', Object.values(IconNames), 'add')}
        rightIcon={select('rightIcon', Object.values(IconNames), 'add')}
        type={select('type', ['button', 'submit'], 'button')}
      >
        Hello Button
      </Button>
    );
  })
  .add('with some emoji', () => (
    <Button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
  ));