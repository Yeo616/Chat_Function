from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

app = FastAPI() 

# CORS: 허용 origin
def origins():
    origins = [
        "http://localhost:3000",
        "http://localhost:8000",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:8000",
        "192.168.1.101:54526",
        "192.168.1.100:54526",
        "exp://192.168.110.111:19000"
    ]
    return origins

def addedMiddleware() -> CORSMiddleware:
    middleware = CORSMiddleware(
        CORSMiddleware,
        allow_origins=["*"],        # 요청을 허용해야하는 origin목록
        # allow_origins=origins,
        allow_credentials=True,     # ORIGIN 간 요청에 대해 쿠키를 지원해야 함. 기본값은 FALSE, 
        allow_methods=["*"],        # 허용되어야하는 http 메서드 목록, 기본값은 GET
        allow_headers=["*"],        # HTTP 요청 헤더 목록, 기본값은 [], 
    )
    return middleware
# https://fastapi.tiangolo.com/tutorial/cors/