from pydantic import BaseModel, Field

class UserCreate(BaseModel) :
  name: str
  email: str
  password: str = Field(..., max_length=72) 

class UserOutput(BaseModel):
  name:str
  email:str

class UserLogin(BaseModel) :
  email: str
  password:str

class Token(BaseModel) :
  access_token: str
  token_type: str