---
title: '트랜잭션 경계를 서비스 계층에 둔 이유'
description: '트랜잭션의 시작과 종료 위치가 비즈니스 흐름에 미치는 영향을 정리했습니다.'
publishedAt: 2026-08-29
tags:
  - Spring
  - Database
draft: false
---

처음에는 데이터가 변경되는 Repository 메서드마다 트랜잭션을 선언했습니다. 구현은 간단했지만 하나의 유스케이스가 여러 저장소를 호출할 때 원자성을 보장하기 어려웠습니다.

## 유스케이스 단위로 묶기

주문 생성은 재고 차감, 주문 저장, 결제 정보 생성을 하나의 흐름으로 처리합니다. 이 중 하나라도 실패하면 전체 작업이 취소되어야 합니다.

```java
@Transactional
public Order createOrder(CreateOrderCommand command) {
    Product product = productRepository.getById(command.productId());
    product.decreaseStock(command.quantity());
    return orderRepository.save(Order.create(product, command.quantity()));
}
```

서비스 메서드를 경계로 사용하니 코드가 실제 비즈니스 작업 단위와 일치했습니다. 테스트에서도 어느 범위까지 롤백되는지 설명하기 쉬워졌습니다.

## 주의할 부분

트랜잭션 안에서 외부 API를 오래 기다리면 데이터베이스 연결을 불필요하게 점유할 수 있습니다. 외부 호출은 가능한 한 경계 밖으로 옮기고, 실패 보상 방식이 필요한지 별도로 판단해야 합니다.
