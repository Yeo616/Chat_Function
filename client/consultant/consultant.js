const nav = document.getElementById("navi");
// nav.innerHTML =
//   '<object type="text/html" data="chat_navigation.html" class="w-full" ></object>';
const chat_box = document.getElementById("chat-box");
chat_box.innerHTML =
  '<object type="text/html" data="main_chat.html" class="w-full" ></object>';

document.addEventListener("DOMContentLoaded", (DOMEvent) => {
  DOMEvent.preventDefault();

  const messageFormEl = document.getElementById("message-form");
  const messageEl = document.getElementById("message");
  const messageBoxEl = document.getElementById("message-box");
  const programInfo = document.getElementById("program-info");

  programInfo.addEventListener("click", programInfoSend);

  function programInfoSend() {
    let programData = "test program";

    console.log("programData : ", programData);

    let sideOff = "justify-end";

    // 메세지 생성
    const msgString = `
            <div class="w-full flex ${sideOff}">
                <div class="box-bordered p-1 bg-blue-500 w-5/12 text-slate-100 rounded mb-1">
                <p>${programData}</p>
                </div>
            </div>
            `;
    // DOM 요소 생성
    const domParser = new DOMParser();
    const msgEl = domParser.parseFromString(msgString, "text/html").body
      .firstElementChild;

    // 메세지 전송
    socket.send(JSON.stringify(programData));
    // socket.send(JSON.stringify({ message: msgString }));
    // DOM 요소 추가
    messageBoxEl.append(msgEl);

    // // 서버로부터 메시지를 받는 이벤트 핸들러 등록
    // socket.addEventListener("message", (socketEvent) => {
    //   console.log("Message from server ", socketEvent.data);
    // });
  }
  // Unique ID for all user
  const userId = window.crypto.randomUUID();
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

  // Create WebSocket connection.
  const socket = new WebSocket(`ws://localhost:8000/ws/${userId}`);

  // // Connection opened
  socket.addEventListener("open", (socketEvent) => {
    console.log("Connection is open");
  });

  // Close connection
  socket.addEventListener("close", (socketEvent) => {
    console.log("Connection is closed");
  });

  socket.onerror = (error) => {
    // 에러 발생
    console.log("Error has occured:", error);
  };

  // // Listen for messages
  socket.addEventListener("message", (socketEvent) => {
    console.log("Message from server ", socketEvent.data);
    // console.log(JSON.parse(socketEvent.data));
    messageAppend(false, JSON.parse(socketEvent.data));
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
      socket.send(messageEl.value); //입력창에 있는 메시지 보내기

      messageAppend(true, { msg: messageEl.value, userId: null });
      errorMap.clear();
      event.target.reset();
    }
  });
});
