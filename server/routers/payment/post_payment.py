# 결제 관련 정보

from fastapi import APIRouter, HTTPException
from datetime import datetime, date
from pydantic import BaseModel
from .root import get_logger,MongoDB

router = APIRouter()
logger = get_logger()
logger.info("Hello post_payment.py")

# DB연결
db = MongoDB()

class PaymentData(BaseModel):
    imp_uid: str
    merchant_uid: str
    pg: str
    pay_method: str
    name: str
    amount: int
    buyer_email: str
    buyer_name: str
    buyer_tel: str
    buyer_postcode: str
    status: str
    date: datetime = datetime.combine(date.today(), datetime.min.time())  # 오늘 날짜를 기본값으로 설정

@router.post("/payment/redirect")
def payment_redirect(data : PaymentData):
    logger.info(f"data.dict(): {data.dict()}")
    result = db.insert_one(data.dict())

    if result.acknowledged:
        return {"status": "success"}
    else:
        raise HTTPException(status_code=500, detail={"status": "failure"})
