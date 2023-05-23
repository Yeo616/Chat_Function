# AWS 진입
# local

# 아직 테스트 중

import time
from datetime import datetime
from fastapi import APIRouter, Request,UploadFile, File
from pydantic import BaseModel
from aws_info import table

router = APIRouter()

# client = boto3.client('sns',
#                       aws_access_key_id=AWS_ACCESS_KEY_ID,
#                       aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
#                       region_name=AWS_DEFAULT_REGION
#                       )
# response = client.list_buckets() # bucket 목록
# print(response)

# DynamoDB 클라이언트 생성: 
# 이제 Boto3를 이용하여 DynamoDB 클라이언트를 생성합니다. 
# 이 클라이언트를 이용하여 DynamoDB에 테이블을 생성/데이터 추가/수정/삭제할 수 있습니다.

class ChatMessage(BaseModel):
    sender:str
    recipient: str
    message:str

@router.post("/chat-log")
async def save_chat_message(chat_message:ChatMessage):
    response = table.put_item(
        Item = {
            'sender':chat_message.sender, #메시지를 보낸 사람
            'recipient':chat_message.recipient, #받는 사람
            'message':chat_message.message, #메시지 내용
            'timestamp':int(time.time())
        }
    )
    return response



