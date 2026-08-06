from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.init_db import init_db
from app.routes import products, auth, user,address, product_variatns,orders, order_me
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="BFCxK API", version="0.1.0")

app.add_middleware (
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True, 
    allow_methods=["*"],
    allow_headers=["*"],
)


app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(products.router)
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(address.router)
app.include_router(product_variatns.router)
app.include_router(orders.router)
app.include_router(order_me.router)

@app.on_event("startup")
def on_startup():
    init_db()


@app.get("/")
def root():
    return {"message": "BFCxK API is running"}

