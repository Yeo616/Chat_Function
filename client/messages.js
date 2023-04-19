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
