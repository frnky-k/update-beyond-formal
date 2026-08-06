from fastapi import APIRouter, Depends, HTTPException, status, File, Form, UploadFile
from app.models import Product, User, ProductVariant
from sqlalchemy.orm import Session, joinedload
from app.database.connection import get_db
from app.schema.product import ProductCreate, ProductUpdate, ProductResponse
from app.routes.user import get_current_user
from typing import List
import shutil, uuid
from pathlib import Path

router = APIRouter()
UPLOAD_DIR = Path("static/products")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.get("/products")
def get_products(category: str = None, search: str = None, db:Session = Depends(get_db)) :
  query = db.query(Product).options(joinedload(Product.variants)).filter(Product.is_active == True)
  if category:
    query = query.filter(Product.category == category)

  if search: 
     query = query.filter(Product.name.ilike(f"%{search}%"))
  products = query.all()

  #get price
  res_data = []
  for product in products:
    first_variant = product.variants[0] if product.variants else None
    price = first_variant.price if first_variant else None

    res_data.append({
      "id" : product.id,
      "name" : product.name,
      "category" : product.category,
      "description" : product.description,
      "is_active" : product.is_active,
      "slug" : product.slug,
      "price" : price,
      "image_url":product.image_url
    })
  return res_data



#   }

@router.get("/products/{slug}", response_model=ProductResponse)
async def get_products_variants(slug:str, db:Session = Depends(get_db)):
  products = db.query(Product).options(joinedload(Product.variants)).filter(Product.slug == slug, Product.is_active == True).first()
  if not products :
     raise HTTPException(status_code=404, detail="Product Not Found")

  return products


@router.post("/admin/products")
def create_product(
   name: str = Form(...),
   slug: str = Form(...),
   description: str = Form(...),
   category: str = Form(...),
   image: UploadFile = File(None),
   current_user: User = Depends(get_current_user),
   db: Session = Depends(get_db),
):
   if current_user.role != "admin":
      raise HTTPException(status_code=403, detail="Admin Access required")
   
   image_url = None
   if image:
    ext = image.filename.split(".")[-1]
    filename= f"{uuid.uuid4()}.{ext}"
    filepath = UPLOAD_DIR / filename
    with filepath.open("wb") as buffer:
       shutil.copyfileobj(image.file, buffer)
    image_url = f"static/products/{filename}"
         

   new_product = Product (
     name=name,
     slug=slug,
     description=description,
     category=category,
     image_url=image_url,
  )
   db.add(new_product)
   db.commit()
   db.refresh(new_product)
   return new_product
  

  




@router.delete("/admin/products/{product_id}")
def delete_product(
    product_id: str, 
    current_user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Forbidden: Admin access required to deactivate products"
        )
    
    # 2. Convert string to UUID safely since your model uses UUID columns
    try:
        product_uuid = uuid.UUID(product_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Invalid Product ID format"
        )

    product = db.query(Product).filter(Product.id == product_uuid).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Item Not Found"
        )
        
    product.is_active = False
    db.commit()
    
    return {"detail": "Product Deactivated"}

@router.put("/admin/products/{product_id}")
def update_product( product_data: ProductUpdate, product_id: str, current_user: User = Depends(get_current_user), db:Session = Depends(get_db)) :
  if current_user.role != "admin" :
    raise HTTPException(status_code=403, detail="You Can't edit this")
  products = db.query(Product).filter(Product.id == product_id).first()
  if not products :
    raise HTTPException(status_code=404, detail="Product Not Found")
  
  updates = product_data.dict(exclude_unset=True)
  for field, values in updates.items() :
    setattr(products, field, values)

  db.commit()
  db.refresh(products)
  return products