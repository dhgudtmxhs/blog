---
title: '설계 원칙과 Gradle Multi-Module로 Modular Monolith 구성하기'
description: 'DDD와 Clean Architecture를 적용하면서 했던 고민들'
publishedAt: 2026-10-02
tags:
  - DDD
  - Clean Architecture
  - Gradle
draft: false
---

## 작성 방향

개념 설명은 실제 구조를 이해하는 데 필요한 만큼만 넣고, ChapChap에서 어떤 경계와 규칙을 선택했는지 중심으로 작성한다.

## 구성

1. **프로젝트와 초기 고민**: 서비스 요구사항과 팀 개발 상황을 소개하고, DDD·Clean Architecture·멀티 모듈을 적용하려던 이유를 적는다.
2. **도메인과 모듈의 경계**: 계정·소비기록·장소·리포트 등의 책임을 어떻게 나눴는지, `app-server`와 `module-core`는 어떤 역할인지 설명한다.
3. **계층과 의존성 규칙**: `api / application / domain / infra` 구성과 모듈 사이의 공개 Application API·DTO 연동을 실제 호출 흐름 하나로 보여준다.
4. **공통 빌드 설정**: `buildSrc`의 Gradle Convention Plugin으로 Java·Spring 공통 설정과 실행·라이브러리 모듈 설정을 나눈 이유를 설명한다. 대표 설정만 발췌한다.
5. **적용하며 느낀 점**: ArchUnit으로 검증한 규칙, 개발 중 편했던 점과 번거로웠던 점을 실제 사례로 정리한다.


용어	분류	핵심
Modular Monolith	아키텍처 스타일	모듈별 경계를 유지하면서 하나의 애플리케이션으로 배포
DDD	소프트웨어 설계 접근법	비즈니스 도메인을 이해하고 그 모델을 중심으로 소프트웨어를 설계
Clean Architecture	아키텍처 스타일·설계 원칙	책임을 분리하고, 의존성이 핵심 비즈니스 로직을 향하도록 구성
Gradle 멀티 모듈	프로젝트·빌드 구성 방식	빌드 단위를 나누고 모듈 간 의존성을 명시적으로 관리

## 참고 PR

[초기 개발 환경 #6](https://github.com/dnd-side-project/dnd-15th-5-backend/pull/6) · [전역 설정 #18](https://github.com/dnd-side-project/dnd-15th-5-backend/pull/18) · [ArchUnit #24](https://github.com/dnd-side-project/dnd-15th-5-backend/pull/24)
