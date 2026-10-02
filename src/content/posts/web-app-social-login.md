---
title: '웹과 앱의 Google·Kakao 로그인을 하나의 인증 흐름으로 구성하기'
description: '웹·앱의 클라이언트 조건을 맞추면서 소셜 로그인 흐름을 공통화한 과정을 정리합니다.'
publishedAt: 2026-10-02
tags:
  - OAuth2
  - Authentication
draft: false
---

## 작성 방향

프론트엔드에서 Provider SDK에 의존하지 않기로 한 배경과 웹·앱을 함께 지원해야 했던 조건에서 시작한다. 로그인 요청부터 서비스 복귀까지 하나의 흐름으로 설명한다.

## 구성

1. **클라이언트 조건과 역할 분담**: 웹과 WebView 앱의 구성, 외부 브라우저 사용, 프론트엔드와 백엔드가 맡은 처리를 정리한다.
2. **공통 로그인 흐름**: 로그인 시작 → Provider 인증 → 백엔드 callback → 웹 callback 또는 앱 Deep Link → 토큰 발급 과정을 그림으로 보여준다.
3. **일회용 로그인 코드**: URL에 JWT를 직접 전달하지 않은 이유와 loginCode 교환 과정을 설명한다. PKCE S256 검증을 Provider OAuth 자체와 백엔드의 코드 교환 중 어디에 적용했는지 구분한다.
4. **웹과 앱의 차이**: 복귀 경로와 Refresh Token 전달·재발급 방식이 달라지는 부분을 정리한다.
5. **Kakao에서 Google로 확장**: 공통으로 유지한 흐름과 Provider별로 분리한 처리를 적고, 실제 연동 과정에서 확인한 문제와 테스트를 덧붙인다.

## 참고 PR

[웹·앱 공통 Kakao 인증 #33](https://github.com/dnd-side-project/dnd-15th-5-backend/pull/33) · [Google 인증 확장 #44](https://github.com/dnd-side-project/dnd-15th-5-backend/pull/44)
