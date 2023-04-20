
from config import db, app
from models import MenuItem, OrderItem, Receipt, User

with app.app_context():

    print("Deleting data...")
    MenuItem.query.delete()
    OrderItem.query.delete()
    Receipt.query.delete()
    User.query.delete()

    print("Seeding Menu data...")
    menu_item1 = MenuItem(price=10.99, name='Cheeseburger', description='A juicy beef patty with melted cheese', veg=False, category='food', img_url='https://images.seattletimes.com/wp-content/uploads/2019/11/11122019_burgers_144441.jpg?d=780x520')
    menu_item2 = MenuItem(price=8.99, name='Veggie Burger', description='A meatless patty with fresh veggies', veg=True, category='food', img_url='https://images.unsplash.com/photo-1585238340764-c6f1f6fe1a6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fFZlZ2dpZSUyMEJ1cmdlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60')
    menu_item3 = MenuItem(price=5.99, name='Fries', description='Crispy golden fries', veg=True, category='food', img_url='https://images.unsplash.com/photo-1608219994488-cc269412b3e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJpZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60')
    menu_item5 = MenuItem(price=4.99, name='Cuppucino', description='Delicious espresso drinks with formy milk on top', veg=True, category='drinks', img_url='https://dx1wqezomiae6.cloudfront.net/variants/8pagbipsg62fetwauwcvusdzghxj/bf2772c50628dda0b54b7611a6af4379aeccab0091d206e804a03175e7331d7c?response-content-disposition=inline%3B%20filename%3D%22cappuccino-coffee-and-tea-flavoring.jpg%22%3B%20filename%2A%3DUTF-8%27%27cappuccino-coffee-and-tea-flavoring.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIPJX7DQABALCI4GQ%2F20230412%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230412T183121Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=67f53994969d9b6dd0390050c6d7f5a0273f47538e781be09969ee15154ed8c1')
    menu_item6 = MenuItem(price=5.99, name='Latte', description='Mily spresso drink', veg=True, category='drinks', img_url='https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')
    menu_item7 = MenuItem(price=6.99, name='Brownies', description='Heavenly brownies.', veg=True, category='dessert', img_url='https://images.unsplash.com/photo-1610611424854-5e07032143d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YnJvd25pZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60')
    menu_item8 = MenuItem(price=4.99, name='Cookies', description='Best cookies in town. Freshly baked everyday!', veg=True, category='dessert', img_url='https://images.unsplash.com/photo-1622467827417-bbe2237067a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fENvb2tpZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60')
    menu_item4 = MenuItem(price=1.99, name='Soda', description='Refreshing carbonated drink', veg=True, category='drinks', img_url='https://southpark.garlicknotpizza.com/wp-content/uploads/sites/15/2020/08/assorted-soda.png')

    print("Committing Menu data...")
    # add menu items to database
    db.session.add_all([menu_item1, menu_item2, menu_item3, menu_item5, menu_item6, menu_item7, menu_item8, menu_item4])
    db.session.commit()

    print("Seeding orderitem data...")
    # create some order items
    order_item1 = OrderItem(quantity=2, menuitem_id=1, receipt_id=2)
    order_item2 = OrderItem(quantity=1, menuitem_id=2, receipt_id=1)
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
   
    