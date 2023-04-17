from app import app
from config import db
from models import MenuItem, OrderItem, Order, User

with app.app_context():

    print("Deleting data...")
    MenuItem.query.delete()
    OrderItem.query.delete()
    Order.query.delete()
    User.query.delete()