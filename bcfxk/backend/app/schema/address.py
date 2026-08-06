from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class AddressCreate(BaseModel) :
  recipient_name: Optional[str] = None
  phone: Optional[str] = None
  street: Optional[str] = None
  city: Optional[str] = None
  province: Optional[str] = None
  postal_code: Optional[str] = None
  is_default: bool =  False

class AddressOut(BaseModel):
    id: UUID
    recipient_name: str
    phone: str
    street: str
    city: str
    province: str
    postal_code: str
    is_default: bool

    class Config:
        from_attributes = True