document.addEventListener("DOMContentLoaded", (DOMEvent) => {
  DOMEvent.preventDefault();

  const messageFormEl = document.getElementById("message-form");
  const messageEl = document.getElementById("message");
  const messageBoxEl = document.getElementById("message-box");

  const programSearchBtn = document.getElementById("programSearchBtn");
  programSearchBtn.addEventListener("click", programSearchBtnHandler);
  const programDoneBtn = document.getElementById("programDoneBtn");
  programDoneBtn.addEventListener("click", programDoneBtnHandler);

  const programList = document.getElementById("program");

  // 만료된 프로그램 불러오기
  async function programDoneBtnHandler() {
    // 다시 불러낼 때, 중복되어 호출 못하게 삭제
    while (programList.firstChild) {
      programList.removeChild(programList.firstChild);
    }

    const response = await fetch("http://127.0.0.1:8000/program/done");
    console.log(response);
    const data = await response.json();
    console.log(data);

    const items = data["result"];
    console.log("items : ", items);

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

      program_title = i["program_title"];
      program_url = i["url"];
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
              endDateStr
            );
          };
        })(program_title, program_url, startDateStr, endDateStr)
      );
    });
  }

  // 오늘 날짜 기준 이후 프로그램 불러오기
  async function programSearchBtnHandler() {
    // 다시 불러낼 때, 중복되어 호출 못하게 삭제
    while (programList.firstChild) {
      programList.removeChild(programList.firstChild);
    }

    const response = await fetch("http://127.0.0.1:8000/program/recent");
    console.log(response);
    const data = await response.json();
    console.log(data);

    const items = data["result"];
    console.log("items : ", items);

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

      program_title = i["program_title"];
      program_url = i["url"];
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
              endDateStr
            );
          };
        })(program_title, program_url, startDateStr, endDateStr)
      );
    });
  }

  // 메세지 클릭하면, 대화창으로 가는 함수
  function programInfoSend(
    program_title,
    program_url,
    startDateStr,
    endDateStr
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

  // Unique ID for all user

  const userId = window.crypto.randomUUID();
  function messageAppend(myMessage, msgContent) {
    let sideOff = "justify-start",
      bgColor = "bg-slate-700",
      specificUser = userId;

    if (myMessage) {
      sideOff = "justify-end";
      bgColor = "bg-indigo-500";
    } else {
      specificUser = msgContent.userId;
    }
    const msgString = `
            <div class="w-full flex ${sideOff}">
                <div class="box-bordered p-1 ${bgColor} w-8/12 text-slate-100 rounded mb-1">
                <p>${specificUser}</p>
                <p>${msgContent.msg}</p>
                </div>
            </div>
            `;

    const domParser = new DOMParser();
    const msgEl = domParser.parseFromString(msgString, "text/html").body
      .firstElementChild;
    messageBoxEl.append(msgEl);
  }

  // Create WebSocket connection.
  const socket = new WebSocket(`ws://localhost:8000/ws/${userId}`);

  // // Connection opened
  socket.addEventListener("open", (socketEvent) => {
    console.log("Connection is open");
  });

  // Close connection
  socket.addEventListener("close", (socketEvent) => {
    console.log("Connection is closed");
  });

  socket.onerror = (error) => {
    // 에러 발생
    console.log("Error has occured:", error);
  };

  // // Listen for messages
  socket.addEventListener("message", (socketEvent) => {
    console.log("Message from server ", socketEvent.data);
    // console.log(JSON.parse(socketEvent.data));
    messageAppend(false, JSON.parse(socketEvent.data));
  });

  const errorMap = new Map();
  messageFormEl.addEventListener("submit", (event) => {
    event.preventDefault();

    if (messageEl.value === "") {
      // 입력창이 비어있을 때
      alert("Enter a message");
      console.log("Enter a message");
      errorMap.set("invalid_message", "Please enter a message");
    } else {
      socket.send(messageEl.value); //입력창에 있는 메시지 보내기

      messageAppend(true, { msg: messageEl.value, userId: null });
      errorMap.clear();
      event.target.reset();
    }
  });
});
