#결제금액 사전등록 API


from fastapi import APIRouter, HTTPException
import json
from datetime import datetime, date
from bson import json_util
from pydantic import BaseModel
from .root import get_logger,MongoDB

router = APIRouter()
logger = get_logger()
logger.info("Hello post_prepare.py")

# DB연결
db = MongoDB()

class PaymentData(BaseModel):
    merchant_uid: str # 가맹점 주문번호
    amount: int  # 결제 예정금액

@router.post("/payment/prepare")
def payment_redirect(data : PaymentData):
    logger.info(f"data.dict(): {data.dict()}")
    result = db.insert_one(data.dict())