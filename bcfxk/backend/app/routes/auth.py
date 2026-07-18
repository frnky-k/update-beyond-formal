from app.models import User
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.schema.auth import UserCreate, UserOutput, UserLogin, Token
from app.routes.user import get_current_user
from app.utils.secure import hash_password, verify_password, create_access_token
from fastapi import HTTPException, Response
from fastapi.security import OAuth2PasswordRequestForm
import json

router = APIRouter()



@router.post("/auth/register")
def register(user_data: UserCreate,db:Session = Depends(get_db)):

  new_user = User (
    name = user_data.name,
    email = user_data.email,
    password_hash = hash_password(user_data.password)

  )
  db.add(new_user)
  db.commit()
  db.refresh(new_user)
  return UserOutput(name=new_user.name, email=new_user.email)

# @router.post("/auth/login")
# def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)) :
#   find_user = db.query(User).filter(User.email == form_data.username).first()

#   if not find_user or not verify_password(form_data.password, find_user.password_hash ) :
#     raise HTTPException(status_code=401, detail="Invalid Email or Password")
  
#   token = create_access_token({"sub" :find_user.email})

#   response.set_cookie(
#     key = "access_token",
#     value= f"Bearer {token}",
#     httponly=True,
#     max_age=1800,
#     samesite="lax", 
#     secure=False

#   )
#   response.body = json.dumps({
#         "detail": "Login Successfully", 
#         "token_type": "bearer",
#         "access_token": token,
#         "role": find_user.role  # <-- CRITICAL: Ensure this key is inside the returned payload
#     }).encode("utf-8")
#   response.media_type = "application/json"
#   return response
  # return Token(access_token=token, token_type="bearer")
  # return response 



# @router.post("/auth/login")
# def login(credentials: UserLogin, db: Session = Depends(get_db)) :
#   find_user = db.query(User).filter(User.email == credentials.email ).first()

#   if not find_user or not verify_password(credentials.password, find_user.password_hash ) :
#     raise HTTPException(status_code=401, detail="Invalid Email or Password")
  
#   token = create_access_token({"sub" :find_user.email}) 
#   return Token(access_token=token, token_type="bearer")


@router.get("/users/me")
def read_current_user(current_user: User = Depends(get_current_user)):
  return {"name": current_user.name, "email": current_user.email}

# 3. FIX: Removed the stray "router" text that was breaking syntax here
@router.post("/auth/login")
def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
  find_user = db.query(User).filter(User.email == form_data.username).first()

  if not find_user or not verify_password(form_data.password, find_user.password_hash):
    raise HTTPException(status_code=401, detail="Invalid Email or Password")
  
  token = create_access_token({"sub": find_user.email})

  # 4. FIX: Cleanly building and returning a valid JSONResponse to handle body overrides without server drops
  payload = {
      "detail": "Login Successfully", 
      "token_type": "bearer",
      "access_token": token,
      "role": find_user.role
  }
  
  res = JSONResponse(content=payload)
  res.set_cookie(
    key="access_token",
    value=f"Bearer {token}",
    httponly=True,
    max_age=86400,
    samesite="lax", 
    secure=False # Kept False for your http://localhost testing pipeline
  )
  
  return res
