---
title: '느린 목록 조회에서 인덱스를 확인한 과정'
description: '실행 계획을 읽고 복합 인덱스의 순서를 결정한 과정을 기록했습니다.'
publishedAt: 2026-08-25
tags:
  - Database
  - Performance
draft: false
---

데이터가 적을 때는 문제가 없던 목록 API가 운영 데이터와 비슷한 크기에서 급격히 느려졌습니다. 감으로 인덱스를 추가하기 전에 실제 쿼리와 실행 계획부터 확인했습니다.

## 문제가 된 쿼리

```sql
select id, status, created_at
from orders
where member_id = :memberId
  and status = :status
order by created_at desc
limit 20;
```

조회 조건과 정렬 조건을 기준으로 `(member_id, status, created_at)` 복합 인덱스를 검토했습니다.

| 확인 항목 | 변경 전 | 변경 후 |
| --- | ---: | ---: |
| 조회 행 수 | 184,000 | 20 |
| 평균 응답 시간 | 820ms | 34ms |
| 추가 정렬 | 발생 | 없음 |

인덱스가 항상 정답은 아닙니다. 쓰기 비용과 저장 공간이 늘어나기 때문에 실제 호출 빈도와 데이터 분포를 함께 확인해야 합니다.
