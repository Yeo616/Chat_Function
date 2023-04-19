import { showItemsList } from "../general/showItemsList.js";

const programDoneBtn = document.getElementById("programDoneBtn");
programDoneBtn.addEventListener("click", programDoneBtnHandler);

const programList = document.getElementById("program");
const messageBoxEl = document.getElementById("message-box");

// 만료된 프로그램 불러오기
async function programDoneBtnHandler() {
  // 다시 불러낼 때, 중복되어 호출 못하게 삭제
  while (programList.firstChild) {
    programList.removeChild(programList.firstChild);
  }
  try {
    const response = await fetch("http://127.0.0.1:8000/program/done");
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
