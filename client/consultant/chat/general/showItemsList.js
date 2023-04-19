// 매개변수는 Array/List여야함.
// programList는 document의 <ul>요소여야함
import { programInfoSend } from "../general/sent_pg.js";

export function NoDuplicateResultes(msg) {
  while (msg.firstChild) {
    msg.removeChild(msg.firstChild);
  }
}
export function showItemsList(items, programList, messageBoxEl) {
  items.forEach((i) => {
    const li = document.createElement("li");
    li.className =
      "hover:border-transparent hover:bg-blue-400 bg-blue-100 hover:shadow-xs hover:shadow-lg flex w-full rounded-lg border-2 border-gray-200 text-sm font-medium my-4 py-4";
    programList.appendChild(li);

    const btn = document.createElement("button");
    const p1 = document.createElement("p");
    p1.className = "text-lg text-black font-semibold";
    const p2 = document.createElement("p");
    li.appendChild(btn);
    // 숫자 값으로 날짜 객체 생성
    const startDate = new Date(i["period_for_class_start"]["$date"]);
    const endDate = new Date(i["period_for_class_end"]["$date"]);

    console.log("Start date:", i["period_for_class_start"]["$date"]);
    console.log("End date:", i["period_for_class_end"]["$date"]);

    // 날짜 객체를 문자열로 변환 (사람이 읽을 수 있는 형식)
    const startDateStr =
      startDate.toLocaleDateString() + " " + startDate.toLocaleTimeString();
    const endDateStr =
      endDate.toLocaleDateString() + " " + endDate.toLocaleTimeString();
    console.log(
      "startDate.toLocaleDateString() :",
      startDate.toLocaleDateString()
    );

    const program_title = i["program_title"];
    const program_url = i["url"];
    p1.textContent = `Title: ${program_title}`;
    btn.appendChild(p1);
    p2.textContent = `period: ${startDateStr} ~ ${endDateStr}`;
    btn.appendChild(p2);

    // 클릭 이벤트 리스너 추가, 클로저 개념 사용
    btn.addEventListener(
      "click",
      (function (program_title, program_url, startDateStr, endDateStr) {
        return function () {
          programInfoSend(
            program_title,
            program_url,
            startDateStr,
            endDateStr,
            messageBoxEl
          );
        };
      })(program_title, program_url, startDateStr, endDateStr)
    );
  });
}
