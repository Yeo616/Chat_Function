import { showItemsList } from "../general/showItemsList.js";

document.addEventListener("DOMContentLoaded", (DOMEvent) => {
  DOMEvent.preventDefault();

  const programSearchBtn = document.getElementById("searchBtn");
  programSearchBtn.addEventListener("click", searchBtnHandler);
  const input = document.getElementById("searchMessage");
  const errorMsg = document.getElementById("errorMsg");
  const programList = document.getElementById("program");
  const messageBoxEl = document.getElementById("message-box");

  async function searchBtnHandler() {
    let value = input.value; // 입력된 값에서 양쪽 공백 제거
    console.log("value : ", value);

    // 빈값
    if (value == "") {
      while (errorMsg.firstChild) {
        errorMsg.removeChild(errorMsg.firstChild);
      }
      console.error("입력된 값이 없습니다."); // 에러 메시지 출력
      const p = document.createElement("p");
      p.className = "text-lg text-red-500 ";
      p.innerHTML = "입력된 값이 없습니다.";
      errorMsg.appendChild(p);
      return; // 함수 종료
    }

    // 공백이 두칸 이상일 때의 처리
    while (true) {
      if (value.includes(" ")) {
        value = value.replace(/ /g, " ");
        console.log("data blank has replaced as ' '.");
      } else {
        console.log("No more extra blank.");
        break;
      }
    }

    try {
      while (errorMsg.firstChild) {
        errorMsg.removeChild(errorMsg.firstChild);
      }
      const response = await fetch(
        `http://127.0.0.1:8000/program/search?data=${value}`
      );
      console.log(response);

      if (response.status !== 200) {
        throw new Error(
          `wrong response from server. (${response.status} ${response.statusText})`
        );
      }

      const data = await response.json();
      console.log("data : " + data);

      const items = data["result"];
      console.log("items : ", items);

      while (programList.firstChild) {
        programList.removeChild(programList.firstChild);
      }
      showItemsList(items, programList, messageBoxEl);
    } catch (error) {
      console.error("에러 발생!");
      alert(error.message);
    }
  }
});
