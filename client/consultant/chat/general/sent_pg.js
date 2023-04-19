import { socket } from "./socket.js";

// 메세지 클릭하면, 대화창으로 가는 함수
export function programInfoSend(
  program_title,
  program_url,
  startDateStr,
  endDateStr,
  messageBoxEl
) {
  const programData = `Title: ${program_title}, period: ${startDateStr} ~ ${endDateStr}`;
  const programUrl = program_url;
  console.log("programData : ", programData);

  let sideOff = "justify-end";

  // 메세지 생성
  const msgString = `
            <div class="w-full flex ${sideOff}">
                <div class="box-bordered p-1 bg-blue-500 w-5/12 text-slate-100 rounded mb-1">
                <p><a href = "https://${programUrl}">${programData}</a></p>
                </div>
            </div>
            `;
  // DOM 요소 생성
  const domParser = new DOMParser();
  const msgEl = domParser.parseFromString(msgString, "text/html").body
    .firstElementChild;

  // 메세지 전송
  socket.send(JSON.stringify(programData));

  // DOM 요소 추가
  messageBoxEl.append(msgEl);
}

// function programInfoSend() {
//   let programData = "test program";

//   console.log("programData : ", programData);

//   let sideOff = "justify-end";

//   // 메세지 생성
//   const msgString = `
//           <div class="w-full flex ${sideOff}">
//               <div class="box-bordered p-1 bg-blue-500 w-5/12 text-slate-100 rounded mb-1">
//               <p>${programData}</p>
//               </div>
//           </div>
//           `;
//   // DOM 요소 생성
//   const domParser = new DOMParser();
//   const msgEl = domParser.parseFromString(msgString, "text/html").body
//     .firstElementChild;

//   // 메세지 전송
//   socket.send(JSON.stringify(programData));
//   // socket.send(JSON.stringify({ message: msgString }));
//   // DOM 요소 추가
//   messageBoxEl.append(msgEl);

//   // // 서버로부터 메시지를 받는 이벤트 핸들러 등록
//   // socket.addEventListener("message", (socketEvent) => {
//   //   console.log("Message from server ", socketEvent.data);
//   // });
// }
