## Command

```shell
docker-compose up (--build)
```

## Preview

<img src = "https://github.com/rlatkd/live-chat/blob/main/assets/preview.gif">

## Flow

```
0. [서버] /kafka/topic으로 STOMP의 메시지 브로커 역할을 kafka에 위임

1. [클라이언트] /api/chat으로 핸드셰이킹 -> ws 뚫림

2. [클라이언트] 메시지를 STOMP로 /kafka/mesaage에 보냄

3. [서버-producer(생산)] /kafka/message로 들어온 메시지를 kafka template에 등록 (send를 통해 카프카 서버에 저장)

4. [서버-consumer(소비)] kafka template에 있는 메시지를 소비

5. [서버-publish(발행)] 소비한 메시지를 /topic/group에 convertAndSend로 보냄

6. [클라이언트-subscribe(구독)] STOMP Client가 /topic/group으로 구독을 하여 메시지를 가져옴
```


## 후기

5일동안 정말 많이 배웠습니다.
