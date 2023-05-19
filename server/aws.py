# AWS 진입
# local

import boto3
import time
from datetime import datetime
from fastapi import APIRouter, Request,UploadFile, File
from pydantic import BaseModel
from botocore.exceptions import NoCredentialsError
import uuid

router = APIRouter()

AWS_ACCESS_KEY_ID ="AKIAVWEGI6POJ7GB22OD"
AWS_SECRET_ACCESS_KEY = "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"
AWS_DEFAULT_REGION = "ap-northeast-2"
AWS_BUCKET_NAME = "yeo-s3-bucket"

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
dynamodb = boto3.resource('dynamodb', region_name=AWS_DEFAULT_REGION, 
                          aws_access_key_id=AWS_ACCESS_KEY_ID,
                      aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

# 채팅로그 저장
table = dynamodb.Table('chat_logs')

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

class Input(BaseModel):
    chat_room_id:str
    userName:str
    test_text:str
    file_url: str
    

@router.post("/awstest")
async def save_test_message(input:Input):
    print(input)
    response = table.put_item(
        Item = {
            'chat_room_id': input.chat_room_id,
            'userName': input.userName,
            'test_text':input.test_text,
            'file_url': input.file_url,
            'date':datetime.today().strftime("%Y-%m-%d"),    # YYYYmmddHHMMSS 형태의 시간 출력
            'time':datetime.today().strftime("%H:%M")
        }
    )
    print(f"putText succeeded: {response}")
    return response


s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID,
                  aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                  region_name=AWS_DEFAULT_REGION)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Use 'UploadFile.file' to get file-like object
        file_name = datetime.today().strftime("%Y%m%d%H%M")+str(uuid.uuid4())+".png"

        response = s3.upload_fileobj(file.file, AWS_BUCKET_NAME, file_name)
        file_url = f"https://s3.{AWS_DEFAULT_REGION}.amazonaws.com/{AWS_BUCKET_NAME}/{file_name}"
        print(f"file_url: {file_url}")

        return {"message": "upload successful", "file_url": file_url,"file_name":file_name}
    except NoCredentialsError:
        print(f"credentials not available")
        return {"message": "credentials not available"}





