from fastapi import APIRouter, HTTPException
import json
from datetime import datetime, date
from .root import get_logger,MongoDB

router = APIRouter(prefix = '/program')

logger = get_logger()
logger.info("Hello get_recent.py")

# DB연결
db = MongoDB()

# 오늘 날짜 기준 이후 프로그램 불러오기
@router.get("/recent")
def program_list_recent():

    # 최근에 등록된 것부터
    today = date.today()
    today_datetime = datetime(today.year, today.month, today.day)
    content = db.find({'period_for_reservation_start':{"$gt": today_datetime}}).sort('created_at',-1)

    return_list = []
    j=0
    for i in content:
        return_list.append(i)
        j+=1
        logger.info(f"content{j}: ", i)

    logger.info(f"List : {return_list}")

    json_list = json.loads(json_util.dumps(return_list))
    logger.info(f"List in Json : {json_list}")
    return {'result': json_list}
