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

`draft: true`인 글은 목록, 상세 페이지, 태그 페이지에서 제외됩니다.
