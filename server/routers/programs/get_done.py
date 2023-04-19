from fastapi import APIRouter, HTTPException
from bson import json_util
from bson.objectid import ObjectId
from datetime import datetime, date
from .root import get_logger,MongoDB

router = APIRouter(prefix = '/program')

logger = get_logger()
logger.info("Hello get_done.py")

# DB연결
db = MongoDB()

# 만료된 프로그램 불러오기
@router.get("/done")
def program_list_done():
# def read_all_programs ( skip: int = 0, limit: int = 10):  

    # 최근에 등록된 것부터
    today = date.today()
    today_datetime = datetime(today.year, today.month, today.day)
    content = db.find({'period_for_reservation_start':{"$lt": today_datetime}}).sort('created_at',-1)

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



