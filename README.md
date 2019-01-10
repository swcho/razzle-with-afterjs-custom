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
* [ ] Css 운용 유연성
  * [*] 선택적 css text: development는 css loader 사용하고 배포시 css 파일 생성
  * [*] 선택적 css module
* [ ] Redux
* [ ] 라우팅
* [ ] Dirty detect
* [ ] Storybook 지원
* [ ] Fetch/mock
* [ ] Jest snapshot test
* [ ] Graphql
