# socketio로 작업하는 python

#===========
# import socketio
from fastapi.middleware.cors import CORSMiddleware
# from fastapi import FastAPI

# sio = socketio.AsyncServer()
# app = FastAPI()

from fastapi import FastAPI
from fastapi_socketio import SocketManager

app = FastAPI()
sm = SocketManager(app=app) # socket_manager

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    
    allow_headers=["*"],
)

@app.sio.on('join')
async def handle_join(sid, *args, **kwargs):
    await app.sio.emit('lobby', 'User joined')

@sm.on('leave')
async def handle_leave(sid, *args, **kwargs):
    await sm.emit('lobby', 'User left')   

# @sio.event
# def connect(sid,environ,auth):
#     #environ 인수는 HTTP 헤더를 포함한 요청정보를 포함하는 표준 SWGI형식의 딕셔너리
#     # auth 인수는 클라가 전달한 모든 인증, 아무것도 없을 때는 None,
#     raise ConnectionRefusedError('authentication failed')
#     # 인증 실패했을 때, 클라로 에러 보냄.

# @sio.event
# def disconnect(sid):
#     print('disconnect',sid)

# sio.emit('my event', {'data': 'foobar'})

# @sio.event
# def begin_chat(sid):
#     sio.enter_room(sid, 'chat_users')

# @sio.event
# def exit_chat(sid):
#     sio.leave_room(sid, 'chat_users')
