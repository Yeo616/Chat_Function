// document.addEventListener("DOMContentLoaded", (DOMEvent) => {
// DOMEvent.preventDefault();
import { userId, connect, socket, messageAppend } from "../socket.js";

const messageFormEl = document.getElementById("message-form");
const messageEl = document.getElementById("message");
const messageBoxEl = document.getElementById("message-box");

connect(messageBoxEl);

const errorMap = new Map();
messageFormEl.addEventListener("submit", (event) => {
  event.preventDefault();

  if (messageEl.value === "") {
    // 입력창이 비어있을 때
    alert("Enter a message");
    console.log("Enter a message");
    errorMap.set("invalid_message", "Please enter a message");
  } else {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(messageEl.value); //입력창에 있는 메시지 보내기

      messageAppend(true, { msg: messageEl.value, userId: null }, messageBoxEl);
      errorMap.clear();
      event.target.reset();
    } else {
      console.log("WebSocket is not open for sending message.");
      alert("WebSocket closed");
    }
  }
});
// });
