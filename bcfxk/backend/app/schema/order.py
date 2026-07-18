from pydantic import BaseModel

class OrderItemCreate(BaseModel) :
  variant_id: str
  quantity: int

class OrderCreate(BaseModel) :
  address_id:str
  items: list[OrderItemCreate]

class OrderStatusUpdate(BaseModel) :
  status: str