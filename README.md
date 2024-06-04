## Command

```shell
docker-compose up (--build)
```

## Preview

재업로드 예정

## Purpose

완벽한 분산 서버 환경(or MSA)는 아니지만
<br>
백엔드 서버가 n개(2개 이상)이라 가정 하에
<br>
각각 다른 서버에 요청을 보내도 같은 topic에서
<br>
서로의 채팅이 오가는 걸 확인 가능
<br>
<br>
``확장성 고려 및 트래픽에 걸리는 부하에 따른 서비스 성능 개선 필요``
<br>
<br>
이번엔 실시간 채팅이란 정해진 틀에 적용했지만
<br>
차후 대용량 분산 환경에서 메시지 큐잉이 필요한 서비스에 접목시켜 기능 구현 예정

## Message Queue

### [메시지큐 정리 링크](https://velog.io/@kata/Message-Queue)

|  | RabbitMQ, ActiveMQ | Apache Kafka |
| --- | --- | --- |
| 메시지 저장 공간 | 메모리에 저장 | 파일로 저장<br>→ 카프카 서버를 재시작해도 메시지 유실 우려 감소 |
| 메시지 전달 방식 | Broker가 Consumer에게 push | Consumer가 Broker로부터 메시지를 직접 가져가는 pull<br>→ 자신의 처리 능력만큼의 메시지만 가져와 최적의 성능 |
| 언제 사용 | 신뢰성과 안전성 | 대용량 분산 시스템 |

## Flow

```
0. [서버1,2] /kafka/topic으로 STOMP의 메시지 브로커 역할을 Kafka 서버에 위임

1. [클라이언트1,2] /api/chat으로 핸드셰이킹 -> ws 통로 개시

2. [클라이언트1] 메시지를 STOMP로 /kafka/mesaage에 보냄

3. [서버1-produce(생산)] /kafka/message로 들어온 메시지를 kafka template에 등록 (send를 통해 Kafka 서버에 저장)

4. [서버1-consume(소비)] Kafka template에 있는 메시지를 소비

5. [서버1-publish(발행)] 소비한 메시지를 /topic/group에 convertAndSend로 보냄

6. [클라이언트2-subscribe(구독)] STOMP Client가 /topic/group으로 구독을 하여 메시지를 가져옴

7. 서버2, 클라이언트2의 로직도 이하 동일
```


## 후기

5일동안 정말 많이 배웠습니다.
<br>
약 4개월만에 React를 구현하느라 익숙치 않았지만 감각을 되찾는 과정이 너무 재밌었고
<br>
그동안 잊고 있었던 Dockerfile도 작성하며 다시금 배우는 계기가 되었습니다.
<br>
STOMP를 사용하다 pub/sub이란 용어가 나오자마자 해보고 싶었던
<br>
Kafka를 스스로 공부하여 적용시키는 과정도 너무 재밌었습니다
<br>
점점 Spring Boot가 익숙해지면서 도전해보고 싶은 기능이 많아
<br>
이번 Final 프로젝트가 너무 기대가 됩니다.
