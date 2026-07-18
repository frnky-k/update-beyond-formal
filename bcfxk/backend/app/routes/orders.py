from fastapi import APIRouter, Depends, HTTPException
from app.models import Order, OrderItem, ProductVariant, User
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.schema.order import OrderItemCreate, OrderCreate
from app.routes.user import get_current_user

router = APIRouter()

@router.post("/orders")
def get_orders(order_data: OrderCreate, current_user = Depends(get_current_user), db:Session = Depends(get_db)):
  new_order = Order(
    user_id = current_user.id,
    address_id = order_data.address_id,
    total_amount= 0
  )
  db.add(new_order)
  db.commit()
  db.refresh(new_order)

  total = 0
  for item in order_data.items:
    find_variant = item.variant_id
    variant = db.query(ProductVariant).filter(ProductVariant.id == find_variant).first()
    if not variant:
      raise HTTPException(status_code=404, detail="No Variant Found")
    
    order_item = OrderItem (
      order_id = new_order.id,
      product_id = variant.product_id, 
      variant_id = variant.id,
      quantity = item.quantity,
      unit_price = variant.price

    )
    db.add(order_item)
    total += variant.price * item.quantity

  new_order.total_amount = total
  db.commit()
  db.refresh(new_order)
  return new_order