// document.addEventListener("DOMContentLoaded", (DOMEvent) => {
// DOMEvent.preventDefault();
import {
  userId,
  socketOpen,
  socketClose,
  socketError,
  socketMsg,
} from "./chat/general/socket.js";

const messageFormEl = document.getElementById("message-form");
const messageEl = document.getElementById("message");
const messageBoxEl = document.getElementById("message-box");

const programList = document.getElementById("program");

// 만료된 프로그램 불러오기
// 오늘 날짜 기준 이후 프로그램 불러오기

// Unique ID for all user

function messageAppend(myMessage, msgContent) {
  let sideOff = "justify-start",
    bgColor = "bg-slate-700",
    specificUser = userId;

  if (myMessage) {
    sideOff = "justify-end";
    bgColor = "bg-indigo-500";
  } else {
    specificUser = msgContent.userId;
  }
  const msgString = `
            <div class="w-full flex ${sideOff}">
                <div class="box-bordered p-1 ${bgColor} w-8/12 text-slate-100 rounded mb-1">
                <p>${specificUser}</p>
                <p>${msgContent.msg}</p>
                </div>
            </div>
            `;

  const domParser = new DOMParser();
  const msgEl = domParser.parseFromString(msgString, "text/html").body
    .firstElementChild;
  messageBoxEl.append(msgEl);
}

socketOpen();
socketClose();
socketError();
socketMsg();

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

    messageAppend(true, { msg: messageEl.value, userId: null });
    errorMap.clear();
    event.target.reset();
  }
});
// });
