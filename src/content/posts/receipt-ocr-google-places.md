---
title: '영수증 OCR에서 Google Places 장소 검색까지 연결한 과정'
description: 'CLOVA OCR 도입부터 영수증 정보 추출, Google Places 연동과 후처리 개선까지 정리합니다.'
publishedAt: 2026-10-02
tags:
  - OCR
  - Google Places
draft: false
---

## 작성 방향

사용자가 소비 기록을 입력할 때 어떤 수고를 줄이려 했는지부터 설명한다. 내용이 길어지면 도입·연동 편과 실제 영수증 검증·후처리 개선 편으로 나눈다.

## 구성

1. **요구사항과 API 선택**: 필요한 영수증 정보와 장소·사진 기능을 정리하고 CLOVA General OCR과 Google Places를 선택한 이유를 적는다. 비교한 서비스의 지원 범위·가격·제약은 당시 기준을 확인해 작성한다.
2. **OCR과 최종 저장 분리**: 이미지 검증, OCR 요청, 임시 이미지 보관, 사용자 확인·수정, 소비 기록 저장의 흐름을 보여준다.
3. **장소 검색 연결**: 추출한 상호명·주소로 Google Places를 조회하는 과정과 OCR 원본 값·장소 검색 결과를 따로 반환한 이유를 설명한다. 지도 현재 위치나 검색 범위 제한은 실제 담당 범위와 근거를 확인해 포함한다.
4. **사진 조회와 호출량 제한**: 썸네일 조회 흐름, Redis 기반 월간 Photo Media 호출 제한, 사진 조회가 실패해도 주요 결과를 반환하는 선택을 다룬다.
5. **실제 영수증에서 드러난 문제**: 잘못된 금액·상호명·주소 사례를 보여주고, 좌표·줄바꿈·신뢰도를 활용한 후처리와 항목별 추출기 분리 과정을 설명한다.
6. **검증 결과와 한계**: 같은 샘플의 개선 전후를 비교한다. 값이 반환된 건수와 정답인 건수, OCR 결과와 Google 장소 매칭 결과를 구분하고 지원하지 않는 입력도 적는다.

## 참고 PR

[OCR·소비 기록 등록 #48](https://github.com/dnd-side-project/dnd-15th-5-backend/pull/48) · [사진 조회·호출량 제한 #52](https://github.com/dnd-side-project/dnd-15th-5-backend/pull/52) · [Google Places 연동 #60](https://github.com/dnd-side-project/dnd-15th-5-backend/pull/60) · [OCR 후처리 개선 #62](https://github.com/dnd-side-project/dnd-15th-5-backend/pull/62)
