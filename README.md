# ohstone blog

Astro, TypeScript, MDX, Content Collections로 구성한 개인 기술 블로그입니다.

## 실행

```bash
npm install
npm run dev
```

## 명령어

```bash
npm run check
npm run build
npm run preview
```

## 글 작성

`src/content/posts`에 `.md` 또는 `.mdx` 파일을 추가합니다.

```md
---
title: '글 제목'
description: '글 설명'
publishedAt: 2026-09-03
tags:
  - Java
draft: false
---
```

`draft: true`인 글은 배포에서 제외됩니다. `npm run dev` 실행 중에는 `/posts/글-파일명/` 주소로 초안을 미리 볼 수 있습니다. 목록에는 공개 글만 표시됩니다.

## 글에 이미지 넣기

이미지를 `public/images`에 넣고 글 파일에서 경로를 사용합니다.

```md
![이미지 설명](/images/photo.png)
```

본문 이미지에는 마우스를 올리거나 키보드로 선택하면 확대 아이콘이 나타납니다. 클릭해 크게 보고 Esc, 닫기 버튼 또는 바깥 영역으로 닫을 수 있습니다. 링크가 걸린 이미지는 기존 링크 동작을 유지합니다.

너비를 지정할 때는 Markdown 안에 HTML을 사용합니다. 높이는 원래 비율을 유지합니다.

```html
<img src="/images/photo.png" alt="이미지 설명" width="320" />
```

같은 문단에 이미지들만 빈 줄 없이 이어 적으면 두 열로 표시됩니다. 모바일에서는 한 열로 표시됩니다.

```md
![첫 번째 이미지](/images/first.png)
![두 번째 이미지](/images/second.png)
```

글 맨 위의 frontmatter에 `cover: '/images/photo.png'`, `coverAlt: '이미지 설명'`을 추가하면 목록 썸네일로 사용합니다.
