const socket = new WebSocket("ws://localhost:8000/chat");

const messages = document.querySelector(".chat-messages");
const form = document.querySelector("form");
const input = document.querySelector("input[type='text']");

socket.addEventListener("message", (event) => {
  const message = event.data;
  messages.innerHTML += `<p>${message}</p>`;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = input.value;
  socket.send(message);
  input.value = "";
});
