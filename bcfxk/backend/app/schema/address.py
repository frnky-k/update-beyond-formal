from pydantic import BaseModel

class AddressCreate(BaseModel) :
  recipient_name: str
  phone: str
  street: str
  city: str
  province: str
  postal_code: str
  is_default: bool =  False