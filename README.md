# Real-Time Chat Function

## 프로젝트 개요
- 바닐라 자바스크립트 및 FastAPI로, WebSocket을 이용하여 채팅 기능을 구현하였습니다. 이를 통해 상담사-유저 간의 실시간으로 채팅을 주고받을 수 있습니다.
- 채팅뿐만 아니라, 관리자 페이지를 통한 프로그램 검색 및 대화창으로 보내 ~~해당 페이지로 이동 기능~~ 등을 제공합니다.
> 목적
- 유저의 문의를 실시간으로 답변하고자, 채팅 기능을 구현하였습니다.
> 기대효과
- 유저의 궁금증을 실시간으로 해결함과 동시에, 대화창에서 바로 결제까지 이뤄지는 one-stop 스무스한 흐름

## Build With
-   Frontend: HTML, CSS, JavaScript, Tailwind CSS
-   Backend: Python, FastAPI
-   Database: MongoDB

## 설치 및 사용 방법
1. 해당 프로젝트를 다운로드 받습니다.
2. (Window) 아래 명령어로 서버 가상 환경을 만듭니다.
```
python -m venv venv
cd venv\Scripts\activate.bat
```
3.  server 디렉토리로 돌아와 라이브러리를 설치합니다.
```
pip install -r requirements.txt
```
4. server 실행 명령어는 아래와 같습니다.
```
uvicorn main:app --reload
```

## Features 개요
> 공통
- (예정)~~로그인 하여 채팅방을 이용할 수 있습니다.~~
- 웹소켓 연결의 상태를 채팅방에 출력합니다.
- 채팅방에서 메시지를 주고 받을 수 있습니다.

> 유저
- (변경 예정) 유저는  상담사가 보낸 프로그램 메시지를 클릭하면 해당 페이지로 이동할 수 있습니다. 

> 상담사
-   상담사는 채팅방에서 프로그램 관련 정보를 검색할 수 있습니다.
- 상담사는 날짜를 기준으로, 진행 예정/만료된 프로그램 정보를 유저에게 전송할 수 있습니다.
-   상담사는 프로그램을 대화창으로 전송할 수 있습니다.


### Features 상세
> 공통

- 실시간 채팅 기능, 웹소켓 연결
    -   Unique한 ID를 생성하여, 해당 ID를 이용하여 서버와 연결합니다.
    -   연결이 성공하면 "Connection is open" 메시지를 출력합니다.
    -   연결이 끊어지면 "Connection is closed" 메시지를 출력하고, 2초 후 자동으로 재연결을 시도합니다

![enter image description here](https://user-images.githubusercontent.com/102447800/233076961-51af34f9-9020-4315-bf17-1d32fdb0d99c.gif)

<br/>

- 메시지 전송 및 수신
    -   입력창에 입력된 메시지를 웹소켓을 통해 서버로 전송합니다.
    -   서버로부터 메시지가 수신되면, 해당 메시지를 출력합니다.
    -   출력된 메시지는 자신이 보낸 메시지와 다른 색상으로 구분됩니다.

![enter image description here](https://user-images.githubusercontent.com/102447800/232804056-b07395ad-acb3-43fe-9b89-2de37db11c02.gif)
 <br/>
 - 입력창이 비어있을 때 메시지 전송을 시도하면 "Enter a message" 메시지가 출력됩니다.
	 - 에러가 발생하면 콘솔에 에러 메시지가 출력됩니다. 
 
 ![enter image description here](https://user-images.githubusercontent.com/102447800/233077591-8fc7f33b-75f9-4fca-b9d8-e4874b2f206a.gif)
 
 <br/>
 
 > 상담사

- 3개의 레이아웃
	- 왼쪽에는 메뉴, 중간 창에는 채팅창, 오른쪽에는 프로그램 등을 검색하여, 바로 정보를 보내줄 수 있다.

![enter image description here](https://user-images.githubusercontent.com/102447800/233078215-4ef7941c-8eb7-45d4-bfde-159ec75a5f2a.png)

- 프로그램 검색
	-   사용자가 입력한 검색어를 서버에 전송하여, 검색어가 포함된 프로그램을 검색합니다.
		-  프로그램 타이트로가, 프로그램 설명란 기준으로 검색합니다.	
	-   검색 결과를 화면에 출력합니다.
	-   검색 결과가 없을 경우, "데이터가 존재하지 않습니다." 라는 에러 메시지를 화면에 출력합니다.

-  프로그램 최신 정보 불러오기
	-   서버에 최신 정보가 업데이트된 프로그램 정보를 요청합니다.
	-   최신 정보가 포함된 프로그램 목록을 화면에 출력합니다.
	-   이미 화면에 출력된 프로그램 목록이 있을 경우, 중복되어 출력하지 않도록 이전 출력 결과를 삭제합니다.

-  만료된 프로그램 불러오기
	-   서버에 만료된 프로그램 정보를 요청합니다.
	-   만료된 프로그램 목록을 화면에 출력합니다.
	-   이미 화면에 출력된 프로그램 목록이 있을 경우, 중복되어 출력하지 않도록 이전 출력 결과를 삭제합니다.

![enter image description here](https://user-images.githubusercontent.com/102447800/233078801-693f4cd0-d1be-4583-83dd-9ceffc8dc25c.gif)

