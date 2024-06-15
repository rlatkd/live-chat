## Preview

<img src = "https://github.com/rlatkd/live-chat/blob/main/assets/preview.gif">

## Command

```
docker-compose up (--build)
```

## Purpose

분산 서버 환경(or MSA)는 아니지만
<br>
백엔드 서버가 n개(2개 이상)이라 가정 하에
<br>
각각 다른 서버에 요청을 보내도 같은
<br>
topic을 구독한 유저들은
<br>
서로의 채팅이 오가는 걸 확인 가능
<br>
<br>
``확장성 고려 및 트래픽에 걸리는 부하에 따른 서비스 성능 개선 필요``
### -> 모니터링 시스템에 적용 ([링크](https://github.com/rlatkd/monitoring-system))

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

이번 FINAL PROJECT가 너무 기대됩니다.

감사합니다.
