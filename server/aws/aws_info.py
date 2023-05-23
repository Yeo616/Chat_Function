import boto3


AWS_ACCESS_KEY_ID ="AKIAVWEGI6POJ7GB22OD"
AWS_SECRET_ACCESS_KEY = "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"
AWS_DEFAULT_REGION = "ap-northeast-2"
AWS_BUCKET_NAME = "yeo-s3-bucket"

dynamodb = boto3.resource('dynamodb', region_name=AWS_DEFAULT_REGION, 
                          aws_access_key_id=AWS_ACCESS_KEY_ID,
                      aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

# 채팅로그 저장
table = dynamodb.Table('chat_logs') 

s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID,
                  aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                  region_name=AWS_DEFAULT_REGION)
