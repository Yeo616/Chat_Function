import { getUserId, connect, getSocket, messageAppend } from "../socket.js";

export const userId = getUserId(true);

document.addEventListener("DOMContentLoaded", (DOMEvent) => {
  DOMEvent.preventDefault();

  // 추후 로그인 정보로 바꿔야함
  const socket = getSocket(userId);

  const messageFormEl = document.getElementById("message-form");
  const messageEl = document.getElementById("message");
  const messageBoxEl = document.getElementById("message-box");

  connect(userId, true, messageBoxEl);

  const errorMap = new Map();
  messageFormEl.addEventListener("submit", (event) => {
    event.preventDefault();

    if (messageEl.value === "") {
      // 입력창이 비어있을 때
      alert("Enter a message");
      console.log("Enter a message");
      errorMap.set("invalid_message", "Please enter a message");
    } else {
      socket.send(messageEl.value); //입력창에 있는 메시지 보내기
      true, { msg: messageEl.value, userId: null }, messageBoxEl;
      errorMap.clear();
      event.target.reset();
    }
  });
});

// docs
// https://websockets.readthedocs.io/en/stable/index.html
// https://fastapi.tiangolo.com/advanced/websockets/#websockets-client
// https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
// https://tailwindcss.com/docs/installation
