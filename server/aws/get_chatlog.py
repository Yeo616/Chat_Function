import time
from datetime import datetime
from fastapi import APIRouter, Request,UploadFile, File
from pydantic import BaseModel
from aws_info import table

router = APIRouter()

@router.get()
async def getLog():
    table.get_item(
        
    )
    pass

