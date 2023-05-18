# websocket으로 작업하는 python

from fastapi import Request,WebSocketDisconnect,WebSocket,FastAPI,HTTPException
from fastapi.responses import HTMLResponse
from copy import copy
import json
from routers.programs import get_recent,get_done,get_search
from routers.payment import post_payment
from middleWare import origins, addedMiddleware
from fastapi.templating import Jinja2Templates

app = FastAPI()
templates = Jinja2Templates(directory="templates")

@app.get("/")
async def read_item(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})

app = FastAPI() 

# # 개발/디버깅용으로 사용할 앱 구동 함수
# def run():
#     import uvicorn
#     uvicorn.run(app)
# ​
# # python main.py로 실행할경우 수행되는 구문
# # uvicorn main:app 으로 실행할 경우 아래 구문은 수행되지 않는다.
# if __name__ == "__main__":
#     run()

app.include_router(get_recent.router)
app.include_router(get_done.router)
app.include_router(get_search.router)
app.include_router(post_payment.router)

import aws
app.include_router(aws.router)

# origins()
addedMiddleware(app)

room_list=[]

# Send message to all users
async def broadcast_to_room(message:str,except_user):
    res = list(filter(lambda i:i['socket'] == except_user,room_list))
    for room in room_list:
        if except_user != room['socket']:
            await room['socket'].send_text(json.dumps({'msg':message,'userId':res[0]['client_id']}))

def remove_room(except_room):
    new_room_list = copy(room_list)
    room_list.clear()
    
@app.websocket('/ws/{client_id}')
async def websocket_endpoint(websocket:WebSocket,client_id:str):
    try:
        await websocket.accept()
        client={
            'client_id':client_id,
            'socket': websocket
        }
        room_list.append(client)
        print("Connection established")

        while True:
            data = await websocket.receive_text()
            await broadcast_to_room(data,websocket)
    except WebSocketDisconnect as e:
        remove_room(websocket)
    
    finally:
        await websocket.close()
        print("Websocket connection closed.")


@app.websocket("/ws/{room_id}")
async def get_room(websocket:WebSocket,room_id:str):
    print(f"client connected : {websocket.client}")
    await websocket.accept() # client의 websocket접속 허용
    await websocket.send_text(f"Welcome client : {websocket.client}")
    while True:
        data = await websocket.receive_text()  # client 메시지 수신대기
        print(f"message received : {data} from : {websocket.client}")
        await websocket.send_text(f"Message text was: {data}") # client에 메시지 전달

