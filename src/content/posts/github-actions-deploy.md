---
title: 'GitHub Actions 배포 작업을 단계별로 나눈 이유'
description: '빌드와 테스트, 배포 단계를 분리해 실패 지점을 명확하게 만들었습니다.'
publishedAt: 2026-08-05
tags:
  - CI/CD
  - GitHub Actions
draft: false
---

처음 작성한 workflow는 하나의 job에서 테스트부터 배포까지 모두 처리했습니다. 실행 시간은 짧았지만 실패했을 때 어느 단계가 문제인지 로그를 길게 찾아야 했습니다.

## 단계 분리

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: ./gradlew test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: echo "deploy"
```

테스트가 성공해야 배포가 시작되도록 의존 관계를 명확히 했습니다. 이후에는 빌드 산출물을 artifact로 전달해 같은 결과물을 검증하고 배포하도록 개선할 수 있습니다.

비밀 값은 workflow에 직접 작성하지 않고 저장소의 secret으로 관리했습니다. 로그에 값이 출력될 수 있는 디버깅 명령도 배포 job에서는 사용하지 않도록 주의했습니다.
