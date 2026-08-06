from pydantic import BaseModel
from uuid import UUID
from decimal import Decimal
from datetime import datetime
from typing import List


class ProductSummary(BaseModel):
  id: UUID
  name: str

  class Config:
    from_attributes = True


class OrderItemCreate(BaseModel) :
  variant_id: str
  quantity: int

class OrderCreate(BaseModel) :
  address_id:str
  items: list[OrderItemCreate]

class OrderStatusUpdate(BaseModel) :
  status: str 

class OrderResponse(BaseModel) :
  id: UUID
  address_id: UUID
  total_amount: Decimal
  created_at: datetime
  items: List[OrderItemResponse]

  class Config: 
    form_attributes: True

class OrderItemResponse(BaseModel):
  id: UUID
  product_id: UUID
  variant_id: UUID
  quantity: int
  product: ProductSummary
  unit_price: Decimal

  class Config:
    from_attributes = True