from fastapi import APIRouter, Depends, HTTPException
from app.models import Order, User
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.routes.user import get_current_user
from app.schema.order import OrderStatusUpdate

router = APIRouter()

@router.get("/orders/me")
def get_my_order(current_user: User = Depends(get_current_user), db:Session = Depends(get_db)) :
  orders = db.query(Order).filter(Order.user_id == current_user.id ).all()

  return orders

@router.get("/orders/{order_id}")
def get_order_by_id(order_id: str, current_user:User = Depends(get_current_user), db:Session=Depends(get_db)) :
  order_by_id = db.query(Order).filter(Order.id == order_id, Order.user_id == current_user.id).first()
  if not order_by_id :
    raise HTTPException(status_code=404, detail="No Order Found")


  return order_by_id

@router.put("/orders/{order_id}/status")
def update_order_status(order_id: str, status_data: OrderStatusUpdate, current_user: User = Depends(get_current_user), db:Session = Depends(get_db)) :
  if current_user.role != "admin" :
    raise HTTPException(status_code=403, detail="You can't access this")
  order_by_id = db.query(Order).filter(Order.id == order_id).first()
  if not order_by_id:
    raise HTTPException(status_code=404, detail="Order Not Found")
  
  order_by_id.status = status_data.status

  db.commit()
  db.refresh(order_by_id)
  return order_by_id
  