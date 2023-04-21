// Unique ID for all user
export const userId = window.crypto.randomUUID();

// Create WebSocket connection.
export const socket = new WebSocket(`ws://localhost:8000/ws/${userId}`);

export function messageAppend(myMessage, msgContent, messageBoxEl) {
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

export function connect(ifuser, messageBoxEl) {
  // Connection opened
  socket.addEventListener("open", (socketEvent) => {
    console.log("Connection is open");

    // 연결 되었을 때 클라이언트에게 알리는 메시지 출력
    DefaultMessage({ msg: "Connected" }, messageBoxEl);
  });

  // Close connection
  socket.addEventListener("close", (socketEvent) => {
    console.log("Connection is closed");

    // 연결이 끊어졌음을 클라이언트에게 알리는 메시지 출력
    if (!ifuser) {
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
    console.log("Message from server ", socketEvent.data);
    // console.log(JSON.parse(socketEvent.data));
    messageAppend(false, JSON.parse(socketEvent.data), messageBoxEl);
  });
}
