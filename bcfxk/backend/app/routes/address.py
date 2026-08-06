from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.routes.user import get_current_user
from app.models import Address
from app.schema.address import AddressCreate, AddressOut
from app.database.connection import get_db
from typing import List

router = APIRouter()

@router.post("/addresses")
def create_addreses(address_data: AddressCreate, current_user = Depends(get_current_user), db:Session = Depends(get_db)) :
  new_address = Address (
    user_id = current_user.id,
    recipient_name = address_data.recipient_name,
    phone = address_data.phone,
    street = address_data.street,
    city = address_data.city, 
    province = address_data.province,
    postal_code = address_data.postal_code,
    is_default = address_data.is_default
  ) 
  db.add(new_address)
  db.commit() 
  db.refresh(new_address)
  return new_address

@router.get("/addresses", response_model=List[AddressOut]) 
def get_addresses(current_user= Depends(get_current_user), db: Session = Depends(get_db)) :
  addresses = db.query(Address).filter(Address.user_id == current_user.id).all()
  return addresses
        