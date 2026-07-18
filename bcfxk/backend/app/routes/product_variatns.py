from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models import ProductVariant, User
from app.schema.product import ProductVariantCreate, ProductVariantUpdate
from app.routes.user import get_current_user

router = APIRouter()

@router.post("/admin/product-variants")
def create_product_variant(variant_data: ProductVariantCreate, db:Session = Depends(get_db)) :
  new_product_variant = ProductVariant (
   product_id = variant_data.product_id, 
   size = variant_data.size, 
   color = variant_data.color, 
   price = variant_data.price, 
   stock = variant_data.stock, 
   sku = variant_data.sku, 
  )

  db.add(new_product_variant)
  db.commit()
  db.refresh(new_product_variant)
  return new_product_variant

@router.put("/product-variant/{variant_id}")
def product_variant_update(variant_id: str, variant_data: ProductVariantUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)) :
  if current_user.role != "admin":
    raise HTTPException(status_code=403, detail="You can't edit this")
  product_variant = db.query(ProductVariant).filter(ProductVariant.id == variant_id).first()
  if not product_variant :
    raise HTTPException(status_code=404, detail="Item Not Found")
  
  updates = variant_data.dict(exclude_unset=True)
  for field, value in updates.items() :
    setattr(product_variant, field, value)
  
  db.commit()
  db.refresh(product_variant)
  return product_variant
