from fastapi import WebSocketDisconnect,WebSocket,WebSocketException,FastAPI,HTTPException
from copy import deepcopy, copy
import json

app = FastAPI() 

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



