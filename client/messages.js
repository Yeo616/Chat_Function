import { getSocket, connect } from "./socket.js";
import { userId } from "./user/main.js";

const messageBox = document.getElementById("message-box");
const optionsContainer = document.getElementById("options-container");

connect(userId, true, messageBox, (socket) => {
  // 상담주제 설정: 유저측
  optionsContainer.addEventListener(
    "click",
    (event) => {
      if (event.target.classList.contains("option")) {
        const selectedOption = event.target.dataset.value;
        // 선택한 항목을 대화창에 표시
        // displayMessage(selectedOption, messageBox);
        let sideOff = "justify-end";
        // 메세지 생성
        const msgString = `
            <div class=" flex ${sideOff}">
                <div class="box-bordered p-1 bg-blue-900 w-5/12 text-slate-100 rounded mb-1">
                <p>선택한 상담 주제: <b>${selectedOption}</b></p>
                </div>
            </div>
            `;

        const domParser = new DOMParser();
        const msgEl = domParser.parseFromString(msgString, "text/html").body
          .firstElementChild;
        // 메세지 전송
        const selectedData = selectedOption;
        socket.send(JSON.stringify(selectedData));

        // DOM 요소 추가
        messageBox.append(msgEl);

        // 버튼 누르고 나면, 회색 버튼으로 바뀌게 할거임.
        const buttons = optionsContainer.querySelectorAll(".option");
        buttons.forEach((button) => {
          button.classList.remove(
            "bg-blue-50",
            "text-purple-600",
            "border-purple-200",
            "hover:text-white",
            "hover:bg-purple-600",
            "hover:border-transparent",
            "focus:outline-none",
            "focus:ring-2",
            "focus:ring-purple-600",
            "focus:ring-offset-2"
          );
          button.classList.add(
            "bg-gray-300",
            "text-gray-600",
            "border-gray-300"
          );
          button.disabled = true;
        });
      }
    },
    // 한 번만 실행
    { once: true }
  );
});

function displayMessage(message, messageBox) {
  const msgElement = document.createElement("div");
  msgElement.textContent = message;
  messageBox.appendChild(msgElement);
}
