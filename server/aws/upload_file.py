import uuid
from aws_info import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION,AWS_BUCKET_NAME
from aws_info import s3
from fastapi import APIRouter, Request,UploadFile, File
from botocore.exceptions import NoCredentialsError
from datetime import datetime

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Use 'UploadFile.file' to get file-like object
        file_name = datetime.today().strftime("%Y%m%d%H%M")+str(uuid.uuid4())+".png"

        response = s3.upload_fileobj(file.file, AWS_BUCKET_NAME, file_name)
        file_url = f"https://s3.{AWS_DEFAULT_REGION}.amazonaws.com/{AWS_BUCKET_NAME}/{file_name}"
        print(f"file_url: {file_url}")

        return {"message": "upload successful", "file_url": file_url,"file_name":file_name}
    except NoCredentialsError:
        print(f"credentials not available")
        return {"message": "credentials not available"}



