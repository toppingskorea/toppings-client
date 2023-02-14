# Monorepo Storybook Builder

모노레포에서 모든 워크스페이스의 스토리북을 빌드합니다.

## 설정

1. storybook 빌드를 원하는 workspace에 `build-storybook` script가 있어야 합니다.

## 빌드

```sh
yarn workspace @toppings/monorepo-storybook-builder build
```

## 실행

```sh
yarn build:storybook
```

### NOTE

- https://github.com/storybook-eol/storybook-deployer 를 참조하여 개발했습니다.
