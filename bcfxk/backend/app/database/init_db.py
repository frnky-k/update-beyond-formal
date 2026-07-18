from app.database.connection import engine, Base
from app.models import (
    User, Address, Product, ProductVariant,
    Order, OrderItem, TelegramSubscriber
)


def init_db():
    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)
    print("Done.")


if __name__ == "__main__":
    init_db()