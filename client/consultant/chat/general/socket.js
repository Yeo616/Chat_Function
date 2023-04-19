export const userId = window.crypto.randomUUID();

// Create WebSocket connection.
export const socket = new WebSocket(`ws://localhost:8000/ws/${userId}`);

// Connection opened
export function socketOpen() {
  socket.addEventListener("open", (socketEvent) => {
    console.log("Connection is open");
  });
}

// Close connection
export function socketClose() {
  socket.addEventListener("close", (socketEvent) => {
    console.log("Connection is closed");
  });
}

export function socketError() {
  socket.onerror = (error) => {
    // 에러 발생
    console.log("Error has occured:", error);
  };
}

// Listen for messages
export function socketMsg() {
  socket.addEventListener("message", (socketEvent) => {
    console.log("Message from server ", socketEvent.data);
    // console.log(JSON.parse(socketEvent.data));
    messageAppend(false, JSON.parse(socketEvent.data));
  });
}
