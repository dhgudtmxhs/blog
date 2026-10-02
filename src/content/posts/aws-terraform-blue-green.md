---
title: '제한된 크레딧으로 구성한 AWS 인프라와 Blue/Green 배포'
description: '예산과 메모리 제약 안에서 Terraform으로 AWS 인프라와 운영·개발 환경을 구성한 과정을 정리합니다.'
publishedAt: 2026-10-02
tags:
  - AWS
  - Terraform
  - CI/CD
draft: false
---

## 작성 방향

AWS를 선택한 현실적인 이유와 크레딧 예산, 3~4개월 운영 목표에서 시작한다. 인프라 구성과 배포 중 겪은 문제를 연결해서 작성한다.

## 구성

1. **AWS 선택과 운영 조건**: AWS 경험을 쌓으려는 목적, 크레딧 예산, 예상 운영 기간을 적는다. 실제 지출과 예상 비용은 구분한다.
2. **Terraform으로 구성한 인프라**: EC2·RDS·S3·네트워크의 역할과 요청 흐름을 그림 하나로 보여주고, IaC로 관리한 범위를 설명한다.
3. **Blue/Green 배포 흐름**: 새 컨테이너 실행, health check, 트래픽 전환, 실패 시 처리 순서와 Caddy·GitHub Actions의 역할을 정리한다.
4. **메모리 부족과 인스턴스 변경**: PR에 기록된 `t4g.micro` 1 GiB에서 `t4g.medium` 4 GiB로의 변경을 바탕으로, 전환 중 동시에 실행되는 컨테이너와 당시 로그를 설명한다.
5. **운영과 Dev 환경의 절충**: EC2·RDS를 공유하면서 분리한 리소스, 운영 배포 중 Dev를 잠시 중지한 이유, 별도 staging 환경까지 고려했는지와 남은 한계를 적는다.
6. **이후 운영 계획**: 크레딧 소진 후 OCI 이전은 아직 계획임을 구분한다. Terraform으로 관리하더라도 클라우드별 리소스 변경과 데이터 이전은 별도 작업으로 다룬다.

## 참고 PR

[운영 배포와 인스턴스 변경 #23](https://github.com/dnd-side-project/dnd-15th-5-backend/pull/23) · [Dev 서버 구성 #54](https://github.com/dnd-side-project/dnd-15th-5-backend/pull/54)
