# from passlib.context import CryptContext

# password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
 
# def hash_password(password: str) :
#   return password_context.hash(password)

#===================================================================================================
from jose import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
import bcrypt

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "fallback-secret-change-this")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def create_access_token(data: dict) :
  to_encode = data.copy()
  expire = datetime.utcnow()+timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
  to_encode.update({"exp": expire})
  return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)   

def decode_access_token(token: str):
  try: 
    payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
    return payload
  except :
    return None

def hash_password(password:str):
  return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8") 
def verify_password(password:str, hash_password:str) :
  return bcrypt.checkpw(password.encode("utf-8"), hash_password.encode("utf-8"))

