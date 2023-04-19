from fastapi import APIRouter, HTTPException, Depends, status,Query
from bson import json_util
import json
from .root import get_logger,MongoDB

router = APIRouter(prefix = '/program')

logger = get_logger()
logger.info("Hello get_search.py")

# DB연결
db = MongoDB()

# 텍스트 검색 기능
@router.get("/search")
async def program_search(data:str=Query(None)):
    logger.info(f"data : {data}")

    if data is None:
        return {"result": "No data provided"}

    # Build the query
    query = { "$or": [
    {"program_title": {"$regex": data, "$options": "i"}}, # 대소문자 상관없이
    {"program_description": {"$regex": data, "$options": "i"}} ]} # 포함되어있는 데이터
    
    logger.info("query was created.")

    # 검색 결과에서 가져올 데이터만 추린다. 
    results = db.find(query)
    results = list(results)
    logger.info("data has found.")
    logger.info(f"results : {results}")

    # 결과값이 없으면
    if len(results) <= 0:
        return {"results": "No data found"}

    json_list = json.loads(json_util.dumps(results))
    logger.info(f"List in Json : {json_list}")

    return {'result': json_list}

