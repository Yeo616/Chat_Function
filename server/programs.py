from fastapi import APIRouter, HTTPException, Depends, status
import pymongo
from pydantic import BaseModel
from bson import json_util
from bson.objectid import ObjectId
import logging
import json
from datetime import datetime, date

# router = APIRouter(prefix = 'program',tags= ['users'])
router = APIRouter(prefix = '/program')

# 로그 설정
# 로그 생성
logger = logging.getLogger('programs')                                               # Logger 인스턴스 생성, 命名
logger.setLevel(logging.DEBUG)                                                       # Logger 출력 기준 설정
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')# Formatter 생성, log 출력 형식

# log 출력
StreamHandler = logging.StreamHandler()                                              # 콘솔 출력 핸들러 생성
StreamHandler.setFormatter(formatter)                                                
logger.addHandler(StreamHandler)  

# DB연결
myclient = pymongo.MongoClient()
db = myclient["test"]["program_db"]

# 오늘 날짜 기준 이후 프로그램 불러오기
@router.get("/program-recent")
def program_list_recent():
# def read_all_programs ( skip: int = 0, limit: int = 10):  

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

# 만료된 프로그램 불러오기
@router.get("/program-done")
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

