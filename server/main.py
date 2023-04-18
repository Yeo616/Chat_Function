from fastapi import WebSocketDisconnect,WebSocket,WebSocketException,FastAPI,HTTPException
from copy import deepcopy, copy
import json
from fastapi.middleware.cors import CORSMiddleware
# from .routers.programs import programs

app = FastAPI() 

# app.include_router(program.router)

# CORS: 허용 origin
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8000",
    "192.168.1.101:54526",
    "192.168.1.100:54526",
    "exp://192.168.110.111:19000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # 요청을 허용해야하는 origin목록
    # allow_origins=origins,
    allow_credentials=True,     # ORIGIN 간 요청에 대해 쿠키를 지원해야 함. 기본값은 FALSE, 
    allow_methods=["*"],        # 허용되어야하는 http 메서드 목록, 기본값은 GET
    allow_headers=["*"],        # HTTP 요청 헤더 목록, 기본값은 [], 
)
# https://fastapi.tiangolo.com/tutorial/cors/

@app.get('/')
def test_index():
    return{"detail":"server is running"}

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



