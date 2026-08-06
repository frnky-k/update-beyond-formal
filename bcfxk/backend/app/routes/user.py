from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import Optional
from app.database.connection import get_db
from app.utils.secure import decode_access_token
from fastapi.security import OAuth2, OAuth2PasswordBearer 
from fastapi.openapi.models import OAuthFlows as OAuthFlowsModel
from app.models import User
from app.schema.user import userUpdate

router = APIRouter()

class Oauth2PasswordCookieBearer(OAuth2):
  def __init__(self, tokenUrl: str):
    super().__init__(flows={"password":{"tokenUrl": tokenUrl}})

  async def __call__(self, request:Request) -> Optional[str]:
    token = request.cookies.get("access_token")
    if not token:
      raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

    if token.startswith("Bearer "):
      token = token.replace("Bearer ", "", 1)
    else:
      token = token

    return token

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

oauth2_scheme = Oauth2PasswordCookieBearer(tokenUrl="auth/login")

def get_current_user(token= Depends(oauth2_scheme), db:Session = Depends(get_db)) :
  decode_token = decode_access_token(token)
  if not decode_token :
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or Expired Token")
  get_email = decode_token["sub"]
  get_user = db.query(User).filter(User.email == get_email).first()
  if  not get_user :
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No User Found")
  return get_user

@router.get("/users/me")
def read_current_user(current_user: User = Depends(get_current_user)) :
  return {"name" : current_user.name, "email":current_user.email}


@router.put("/users/me")
def update_user(user_data: userUpdate, current_username: User = Depends(get_current_user), db: Session = Depends(get_db)):
  if not current_username:
    raise HTTPException(status_code=404, detail="Username not Found")

  updates = user_data.model_dump(exclude_unset=True)
  for field, values in updates.items():
    setattr(current_username, field, values)

  db.commit()
  db.refresh(current_username)
  return current_username