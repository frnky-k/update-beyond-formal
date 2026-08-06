import uuid
from datetime import datetime
from sqlalchemy import (
    Column, String, Text, Integer, Boolean,
    ForeignKey, DateTime, BigInteger, CheckConstraint, Numeric
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database.connection import Base



class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    role = Column(String(20), default="customer")
    created_at = Column(DateTime, default=datetime.utcnow)

    __table_args__ = (
        CheckConstraint("role IN ('customer', 'admin')", name="user_role_check"),
    )

    orders = relationship("Order", back_populates="user")
    addresses = relationship("Address", back_populates="user")
    telegram = relationship("TelegramSubscriber", back_populates="user", uselist=False)

    def __repr__(self):
        return f"<User {self.email}>"


class Address(Base):
    __tablename__ = "addresses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    recipient_name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    street = Column(Text, nullable=False)
    city = Column(String(100), nullable=False)
    province = Column(String(100), nullable=False)
    postal_code = Column(String(10), nullable=False)
    is_default = Column(Boolean, default=False)

    user = relationship("User", back_populates="addresses")
    orders = relationship("Order", back_populates="address")

    def __repr__(self):
        return f"<Address {self.city}, {self.province}>"


class Product(Base):
    __tablename__ = "products"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    image_url = Column(String, nullable=True)
    name = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, nullable=False)
    description = Column(Text)
    category = Column(String(100))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    variants = relationship("ProductVariant", back_populates="product", cascade="all, delete")
    order_items = relationship("OrderItem", back_populates="product")

    def __repr__(self):
        return f"<Product {self.name}>"


class ProductVariant(Base):
    __tablename__ = "product_variants"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    size = Column(String(10))
    color = Column(String(50))
    price = Column(Numeric(10,2), nullable=False)
    stock = Column(Integer, default=0)
    sku = Column(String(100), unique=True, nullable=False)

    product = relationship("Product", back_populates="variants")
    order_items = relationship("OrderItem", back_populates="variant")

    def __repr__(self):
        return f"<ProductVariant {self.sku}>"


class Order(Base):
    __tablename__ = "orders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    address_id = Column(UUID(as_uuid=True), ForeignKey("addresses.id"), nullable=False)
    status = Column(String(30), default="pending")
    total_amount = Column(Numeric(10, 2), nullable=False)
    payment_status = Column(String(20), default="unpaid")
    midtrans_order_id = Column(String(100), unique=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    __table_args__ = (
        CheckConstraint(
            "status IN ('pending','confirmed','shipped','delivered','cancelled')",
            name="order_status_check"
        ),
        CheckConstraint(
            "payment_status IN ('unpaid','paid','refunded')",
            name="payment_status_check"
        ),
    )

    user = relationship("User", back_populates="orders")
    address = relationship("Address", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete")

    def __repr__(self):
        return f"<Order {self.id} - {self.status}>"


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id"), nullable=False)
    product = relationship("Product")
    variant_id = Column(UUID(as_uuid=True), ForeignKey("product_variants.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Numeric(10,2), nullable=False)

    __table_args__ = (
        CheckConstraint("quantity > 0", name="order_item_qty_check"),
    )

    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")
    variant = relationship("ProductVariant", back_populates="order_items")

    @property
    def subtotal(self):
        return self.quantity * self.unit_price

    def __repr__(self):
        return f"<OrderItem {self.product_id} x{self.quantity}>"
    
class TelegramSubscriber(Base):
    __tablename__ = "telegram_subscribers"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    chat_id = Column(BigInteger, unique=True, nullable=False)
    notify_drops = Column(Boolean, default=True)
    notify_orders = Column(Boolean, default=True)
    subscribed_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="telegram")

    def __repr__(self):
        return f"<TelegramSubscriber chat_id={self.chat_id}>"