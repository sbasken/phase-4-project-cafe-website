
from config import db, app
from models import MenuItem, OrderItem, Receipt, User

with app.app_context():

    print("Deleting data...")
    MenuItem.query.delete()
    OrderItem.query.delete()
    Receipt.query.delete()
    User.query.delete()

    m1 = MenuItem(name="Milk", price=10.00, category="drinks")
    db.session.add(m1)
    db.session.commit()
    