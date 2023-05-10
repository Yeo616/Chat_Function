import {
  getUserId,
  getSocket,
  connect,
  messageAppend,
  DefaultMessage,
} from "../socket.js";

Notification.requestPermission();

//알림 권한 요청
function getNotificationPermission() {
  // 브라우저 지원 여부 체크
  if (!("Notification" in window)) {
    alert("데스크톱 알림을 지원하지 않는 브라우저입니다.");
  }
  // 데스크탑 알림 권한 요청
  Notification.requestPermission(function (result) {
    // 권한 거절
    if (result == "denied") {
      alert(
        "알림을 차단하셨습니다.\n브라우저의 사이트 설정에서 변경하실 수 있습니다."
      );
      return false;
    }
  });
}
new Notification("타이틀", { body: "메세지내용" });

const messageFormEl = document.getElementById("message-form");
const messageEl = document.getElementById("message");
const messageBoxEl = document.getElementById("message-box");

document.addEventListener("DOMContentLoaded", (DOMEvent) => {
  DOMEvent.preventDefault();

  // 추후 로그인 정보로 바꿔야함
  const userId = getUserId(false);
  const socket = getSocket(userId);

  // 웹 소켓 연결
  connect(userId, false, messageBoxEl);

  // 웹 소켓 통신 끊는 기능
  const chatClosebtn = document.getElementById("chat-close");
  chatClosebtn.addEventListener("click", () => {
    DefaultMessage({ msg: "Connection is closed" }, messageBoxEl);
    socket.close();
  });

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

        messageAppend(
          userId,
          true,
          { msg: messageEl.value, userId: null },
          messageBoxEl
        );
        errorMap.clear();
        event.target.reset();
      } else {
        console.log("WebSocket is not open for sending message.");
        alert("WebSocket closed");
      }
    }
  });
});
