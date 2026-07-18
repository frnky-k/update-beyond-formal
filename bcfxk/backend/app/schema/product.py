from pydantic import BaseModel
from typing import Optional, List
from decimal import Decimal
from uuid import UUID

class ProductCreate(BaseModel):
  name: str
  slug: str
  description: str
  category: str
  
class ProductVariantCreate(BaseModel) :
  product_id: UUID
  size: str
  color: str
  price: Decimal
  stock: int
  sku: str

  class Config:
    from_attributes = True

class ProductUpdate(BaseModel) :
  name: Optional[str] = None
  slug: Optional[str] = None
  description: Optional[str] = None
  category: Optional[str] = None

class ProductVariantUpdate(BaseModel) :
  size: Optional[str] = None
  color: Optional[str] = None
  price: Optional[str] = None
  stock: Optional[str] = None
  sku: Optional[str] = None

class ProductResponse(BaseModel):
  name: str
  slug: str 
  description: str
  category: str
  variants: List[ProductVariantCreate]

  class Config:
    from_attributes = True
