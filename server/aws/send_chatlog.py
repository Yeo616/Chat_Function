import time
from datetime import datetime
from fastapi import APIRouter, Request,UploadFile, File
from pydantic import BaseModel
from aws_info import table

router = APIRouter()

class Input(BaseModel):
    # chat_room_id:str
    userName:str
    test_text:str
    file_url: str
    

@router.post("/awstest")
async def save_test_message(input:Input):
    print(input)
    response = table.put_item(
        Key = {
            # 'chat_room_id': input.chat_room_id,
            'userName': input.userName,
            'test_text':input.test_text,
            'file_url': input.file_url,
            'date':datetime.today().strftime("%Y-%m-%d"),    # YYYYmmddHHMMSS 형태의 시간 출력
            'time':datetime.today().strftime("%H:%M")
        }
    )
    print(f"putText succeeded: {response}")
    return response