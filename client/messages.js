import { socket } from "./socket.js";

const messageBox = document.getElementById("message-box");
const optionsContainer = document.getElementById("options-container");

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
    }
    // optionsContainer.target.classList.remove(
    //   "hover:text-white",
    //   "hover:bg-purple-600",
    //   "hover:border-transparent",
    //   "focus:outline-none",
    //   "focus:ring-2",
    //   "focus:ring-purple-600",
    //   "focus:ring-offset-2",
    //   "bg-blue-50",
    //   "text-purple-600"
    // );
  },
  { once: true }
);

function displayMessage(message, messageBox) {
  const msgElement = document.createElement("div");
  msgElement.textContent = message;
  messageBox.appendChild(msgElement);
}

// export function messageAppend(myMessage, msgContent, messageBoxEl) {
//   let sideOff = "justify-start",
//     bgColor = "bg-slate-700",
//     specificUser = userId;

//   if (myMessage) {
//     sideOff = "justify-end";
//     bgColor = "bg-indigo-500";
//   } else {
//     specificUser = msgContent.userId;
//   }
//   const msgString = `
//             <div class="w-full flex ${sideOff}">
//                 <div class="box-bordered p-1 ${bgColor} w-8/12 text-slate-100 rounded mb-1">
//                 <p>${specificUser}</p>
//                 <p>${msgContent.msg}</p>
//                 </div>
//             </div>
//             `;

//   const domParser = new DOMParser();
//   const msgEl = domParser.parseFromString(msgString, "text/html").body
//     .firstElementChild;
//   messageBoxEl.append(msgEl);
// }

// // 안내 메시지
// export function DefaultMessage(msgContent, messageBoxEl) {
//   const msgString = `
//             <div class="w-full flex justify-center item-center">
//                 <div class="box-bordered p-1 w-8/12 text-slate-100 rounded mb-1">
//                 <p>---------   ${msgContent.msg}   ---------</p>
//                 </div>
//             </div>
//             `;

//   const domParser = new DOMParser();
//   const msgEl = domParser.parseFromString(msgString, "text/html").body
//     .firstElementChild;
//   messageBoxEl.append(msgEl);
// }
