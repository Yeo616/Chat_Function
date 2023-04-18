import logging
from fastapi import FastApi, APIRouter
import pymongo


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
