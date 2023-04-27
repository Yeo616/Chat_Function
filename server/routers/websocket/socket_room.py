from fastapi import APIRouter, WebSocketDisconnect,WebSocket,WebSocketException,FastAPI,HTTPException
from copy import copy
import json
from routers.programs import get_recent,get_done,get_search
from middleWare import origins, addedMiddleware

router = APIRouter() 

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

connected_clients = {}

async def websocket_endpoint(websocket: WebSocket, chatroom_id: str):
    await websocket.accept()
    if chatroom_id not in connected_clients:
        connected_clients[chatroom_id] = []
    connected_clients[chatroom_id].append(websocket)

@router.websocket('/ws/{chatroom_id}')
async def websocket_endpoint(websocket:WebSocket,chatroom_id:str):
    try:
        await websocket.accept()
        client={
            'chatroom_id':chatroom_id,
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



