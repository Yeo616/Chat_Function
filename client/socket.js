// Unique ID for all user
// export const userId = window.crypto.randomUUID();

// Create WebSocket connection.
export function getUserId(ifUser) {
  var userInput = prompt("대화명은 최소 2글자 이상입니다. \n\n대화명 : ");

  if (userInput == null || userInput.length <= 1) {
    alert("대화명 입력 필요");
    var userInput = prompt("대화명은 최소 2글자 이상입니다. \n\n대화명 : ");
  }

  if (!ifUser) {
    // 상담사 대화명
    var userId = "상담사 " + userInput;
  } else {
    var userId = userInput;
  }
  console.log("대화명(userInput) : ", userInput);
  // userId 내보내기
  return userId;
}

export function getSocket(userId) {
  return new WebSocket(`ws://localhost:8000/ws/${userId}`);
}

export function messageAppend(userId, myMessage, msgContent, messageBoxEl) {
  console.log("userId : " + userId);
  console.log("myMessage : " + myMessage);
  console.log("msgContent : " + msgContent.msg);
  console.log("messageBoxEl : " + messageBoxEl);
  let sideOff = "justify-end";
  let bgColor = "bg-indigo-500";
  if (!myMessage) {
    sideOff = "justify-end";
    bgColor = "bg-indigo-500";
    // let specificUser = msgContent.userId;
  }

  const msgString = `
            <div class="w-full flex ${sideOff}">
                <div class="box-bordered p-1 ${bgColor} w-8/12 text-slate-100 rounded mb-1">
                <p>${userId}</p>
                <p>${msgContent.msg}</p>
                </div>
            </div>
            `;

  const domParser = new DOMParser();
  const msgEl = domParser.parseFromString(msgString, "text/html").body
    .firstElementChild;
  messageBoxEl.append(msgEl);
}

// 안내 메시지
export function DefaultMessage(msgContent, messageBoxEl) {
  const msgString = `
            <div class="w-full flex justify-center item-center">
                <div class="box-bordered p-1 w-8/12 text-slate-100 rounded mb-1">
                <p>---------   ${msgContent.msg}   ---------</p>
                </div>
            </div>
            `;

  const domParser = new DOMParser();
  const msgEl = domParser.parseFromString(msgString, "text/html").body
    .firstElementChild;
  messageBoxEl.append(msgEl);
}

export function connect(userId, ifuser, messageBoxEl, onOpenCallback) {
  var socket = new WebSocket(`ws://localhost:8000/ws/${userId}`);

  // Connection opened
  socket.addEventListener("open", (socketEvent) => {
    console.log("Connection is open");

    // 연결 되었을 때 클라이언트에게 알리는 메시지 출력
    DefaultMessage({ msg: "Connected" }, messageBoxEl);
    // 콜백 함수가 제공되면 실행
    if (onOpenCallback) {
      onOpenCallback(socket);
    }
  });

  // Close connection
  socket.addEventListener("close", (socketEvent) => {
    console.log("Connection is closed");

    // 연결이 끊어졌음을 클라에게 알리지 않는다.
    if (!ifuser) {
      DefaultMessage({ msg: "Connection is closed" }, messageBoxEl);
    } else {
      DefaultMessage({ msg: "Connection is closed" }, messageBoxEl);
    }

    // 자동으로 재연결하는 코드
    setTimeout(() => {
      connect();
    }, 2000);
  });

  // 에러 발생
  socket.onerror = (error) => {
    console.log("Error has occured:", error);
  };

  // Listen for messages
  socket.addEventListener("message", (socketEvent) => {
    console.log("message : socketEvent ", socketEvent);
    console.log("message : Message from server ", socketEvent.data);
    messageAppend(userId, false, JSON.parse(socketEvent.data), messageBoxEl);
  });
}
