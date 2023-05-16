import {
  showItemsList,
  NoDuplicateResultes,
} from "../general/showItemsList.js";

const programSearchBtn = document.getElementById("programRecentBtn");
programSearchBtn.addEventListener("click", programRecentBtnHandler);
const messageBoxEl = document.getElementById("message-box");

const programList = document.getElementById("program");

// 오늘 날짜 기준 이후 프로그램 불러오기
async function programRecentBtnHandler() {
  // 다시 불러낼 때, 중복되어 호출 못하게 삭제
  NoDuplicateResultes(programList);

  try {
    const response = await fetch(
      `http://${window.location.hostnam}:8000/program/recent`
    );
    // window.location.host;("127.0.0.1:5501");
    // window.location.origin; "http://127.0.0.1:5501";
    // window.location.hostname; "127.0.0.1";
    console.log(response);

    if (response.status !== 200) {
      throw new Error(
        `wrong response from server. (${response.status} ${response.statusText})`
      );
    }

    const data = await response.json();
    console.log(data);

    const items = data["result"];
    console.log("items : ", items);

    showItemsList(items, programList, messageBoxEl);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}
