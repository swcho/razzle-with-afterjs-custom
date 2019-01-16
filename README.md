# Razzle x After.js

## How to use

Download the example [or clone the whole project](https://github.com/jaredpalmer/razzle.git):

```bash
curl https://codeload.github.com/jaredpalmer/razzle/tar.gz/master | tar -xz --strip=2 razzle-master/examples/with-afterjs
cd with-afterjs
```

Install it and run:

```bash
yarn install
yarn start
```

## Idea behind the example

This is a basic, bare-bones example of how to use After.js and Razzle.

## Check List

* [*] TypeScript 지원
* [*] Debugability:
  * <https://github.com/jaredpalmer/razzle/issues/546#issuecomment-377628210>
* [*] eslint with type
* [*] CSS Flexibility
  * [*] less
  * [*] CSS module
  * [*] Common component style to text
  * [*] CSS SSR Awareness(not adding style if exists): Fail to fork style-loader, use isomorphic-style-loader
* [ ] Storybook 지원
* [ ] SEO
  * [ ] Dynamic title
* [ ] Redux
* [ ] Routing
  * [ ] Dirty detect
* [ ] Fetch/mock
* [ ] Jest snapshot test
* [ ] Graphql
