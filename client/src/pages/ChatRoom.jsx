/* eslint-disable */

import Chat from "../components/Chat";
import Input from "../components/Input";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const ChatRoom = () => {

    //유즈로케이션
    const location = useLocation();

    //로그인한 유저 정보 받아오기
    const currentUser = location.state?.user;

    //메시지 상태저장
    const [messages, setMessages] = useState([]);

    //메시지 받기
    const [stompClient, setStompClient] = useState(null);

    //WebSocket 연결
    useEffect(() => {
        const socket = new SockJS("http://localhost:9100/my-chat"); //http로 최초1회 핸드셰이크하면 그 후론 알아서 ws 통신
        const client = Stomp.over(socket);

        client.connect({}, () => {
            client.subscribe("/topic/group", (message) => { //STOMP Client 카프카를 구독(메시지 브로커 매핑)
                onMessageReceived(JSON.parse(message.body));
            });
        });

        setStompClient(client); //STOMP Client 설정

        return () => {
            client.disconnect();
        };
    }, []);

    //메시지 수신
    const onMessageReceived = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    //메시지 송신 핸들러
    const handleMessageSubmit = (message) => {
        if (stompClient) {
            const msg = {
                author: currentUser.name,
                content: message,
            };
            stompClient.send("/kafka/message", {}, JSON.stringify(msg)); //STOMP Client가 메시지 전달
        } else {
            console.log("STOMP 연결 안 됨");
        }
    };

    return (
        <>
            <div className="header">
                <h4>효성에프엠에스 1기 톡방</h4>
            </div>
            <div className="content">
                <Chat messages={messages} currentUser={currentUser} />
                <Input handleOnSubmit={handleMessageSubmit} />
            </div>
        </>
    );
};

export default ChatRoom;
