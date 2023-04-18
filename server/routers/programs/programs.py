from fastapi import APIRouter, HTTPException, Depends, status
import pymongo
from pydantic import BaseModel
from bson import json_util
from bson.objectid import ObjectId
import json
from datetime import datetime, date
from root import router, logger

router = APIRouter(prefix = '/program')

# 오늘 날짜 기준 이후 프로그램 불러오기
@router.get("/recent")
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

@router.get("/search")
async def program_search():
    # 텍스트 검색 기능, 페이징 처리

    logger.info(f"data : {data}")
    # 페이징: 한 페이지 당 몇 개의 게시물을 출력할 것인가
    limit = 3

    # 입력값이 없을 경우: 모든 데이터 출력
    if data is None:
        datas = db.find({}).sort('created_at',-1).skip((page - 1) * limit).limit(limit)
        logger.info("no data, return all the data")

        datas = list(datas)
        logger.info(f"datas : {datas}")
        return datas# program_db 컬럭션에 있는 모든 데이터를 가져옴

    # 입력값 양쪽 공백 제거
    data = data.strip()
    logger.info("data has trimmed")

    ##### 문자 사이에 공백이 많을 경우 -> 공백 하나로 치환
    # 방법1: replace
    while True:
        if "  " in data:
            data = data.replace("  " , " ")
            logger.info("data blank has replaced as ' '.")
        else:
            logger.info("No more extra blank.")
            break
        
    # 방법2 : 문자열 나누기와 문자열 합치기(split_join)
    # if data 
    # data = ' '.join(data.split())
    # 방법3: 정규표현식(re) 이용하기

    #### TODO 정확한 값일 경우
    #### TODO phrase 값일 경우: 띄어쓰기가 있을 경우
    #### TODO 포함된 값일 경우

    # Build the query
    query = { "$or": [
    {"program_title": {"$regex": data, "$options": "i"}}, # 대소문자 상관없이
    {"program_description": {"$regex": data, "$options": "i"}} ]} # 포함되어있는 데이터
    
    logger.info("query was created.")

    # Issue the query to the "documents" collection
    # 검색 결과에서 가져올 데이터만 추린다. 
    results = db.find(query).skip((page - 1) * limit).limit(limit)
    results = list(results)
    logger.info("data has found.")
    logger.info(f"results : {results}[0]")

    # 결과값이 없으면
    if len(results) <= 0:
        return {"results": "No data found"}

    # 페이징: 게시물의 총 개수 세기
    tot_count = len(list(db.find(query)))
    logger.info(f"tot_count : {tot_count}")

    # 페이징: 마지막 페이지의 수 구하기
    last_page_num = math.ceil(tot_count / limit) # 페이징: 반드시 올림을 해줘야함
    logger.info(f"last_page_num : {last_page_num}")

    if last_page_num < page:    # 페이징: 페이지 번호가 마지막 페이지 수보다 클때 에러 발생
        logger.error("last_page_num: {last_page_num} <page: {page}")
        raise HTTPException(
                    status_code = 400,detail=f'last pagination is {last_page_num}, page number should be less than last page number')

    # 페이징: 페이지 블럭을 5개씩 표기
    block_size = 5

    # 페이징: 현재 블럭의 위치 (첫 번째 블럭이라면, block_num = 0)
    block_num = int((page - 1) / block_size)
    logger.info(f"block_num: {block_num}")

    # 페이징: 현재 블럭의 맨 처음 페이지 넘버 (첫 번째 블럭이라면, block_start = 1, 두 번째 블럭이라면, block_start = 6)
    block_start = (block_size * block_num) + 1
    logger.info(f"block_start : {block_start}")

    # 페이징: 현재 블럭의 맨 끝 페이지 넘버 (첫 번째 블럭이라면, block_end = 5)
    block_end = block_start + (block_size - 1)
    logger.info(f"block_end : {block_end}")

    # return_list = []
    # j=0
    # for i in datas:
    #     return_list.append(i)
    #     j+=1
    #     # logger.info(f"datas{j}: ", i)

    # json_list = json.loads(json_util.dumps(return_list))
    # logger.info(f"List in Json : {json_list}")

    return {"page_limit": limit, 
            "page": page, 
            "block_start": block_start,
            "block_end": block_end, 
            "last_page_num": last_page_num, 
            "List_in_Json": results}
    # return results 
