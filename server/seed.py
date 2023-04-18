
from config import db, app
from models import MenuItem, OrderItem, Receipt, User

with app.app_context():

    print("Deleting data...")
    MenuItem.query.delete()
    OrderItem.query.delete()
    Receipt.query.delete()
    User.query.delete()

    print("Seeding Menu data...")
    menu_item1 = MenuItem(price=10.99, name='Cheeseburger', description='A juicy beef patty with melted cheese', veg=False, category='Burgers')
    menu_item2 = MenuItem(price=8.99, name='Veggie Burger', description='A meatless patty with fresh veggies', veg=True, category='Burgers')
    menu_item3 = MenuItem(price=5.99, name='Fries', description='Crispy golden fries', veg=True, category='Sides')
    menu_item4 = MenuItem(price=1.99, name='Soda', description='Refreshing carbonated drink', veg=True, category='Beverages')

    print("Committing Menu data...")
    # add menu items to database
    db.session.add_all([menu_item1, menu_item2, menu_item3, menu_item4])
    db.session.commit()

    print("Seeding orderitem data...")
    # create some order items
    order_item1 = OrderItem(quantity=2, menuitem_id=1, receipt_id=None)
    order_item2 = OrderItem(quantity=1, menuitem_id=2, receipt_id=None)
    order_item3 = OrderItem(quantity=3, menuitem_id=3, receipt_id=None)
    # orderitems = [order_item1, order_item2, order_item3]

    print("Seeding receipt data...")
    # create a receipt
    receipt = Receipt(user_id=1, total=22.97, completed=True)

    print("Seeding user data...")
    # create a user
    user1 = User(username='john_doe', customer=True)
    user1.password_hash = 'password'  # set password
    
    user2 = User(username='jane_doe', customer=False)
    user2.password_hash = 'password1'  # set password

    print("Commiting orderitem data...")
    # add order items to database
    db.session.add_all([order_item1, order_item2, order_item3])
    db.session.commit()


    print("Commiting user data...")
    # add user to database
    db.session.add_all([user1, user2])
    db.session.commit()

    print("Commiting receipt data...")
    # add receipt to database
    db.session.add(receipt)
    db.session.commit()
   
    