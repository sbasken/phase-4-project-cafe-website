
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
    menu_item9 = MenuItem(price=5.99, name='Margherita Pizza', description='Tomato sauce, mozzarella, and basil', veg=True, category='food', img_url='https://images.unsplash.com/photo-1598023696416-0193a0bcd302?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1236&q=80')
    menu_item10 = MenuItem(price=7.99, name='Green Goddess Salad', description='Mixed greens with avocado, cucumber, and green goddess dressing', veg=True, category='food', img_url='https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1078&q=80')
    menu_item11 = MenuItem(price=4.99, name='Iced Coffee', description='Cold-brew coffee with choice of milk and sweetener', veg=True, category='drinks', img_url='https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1014&q=80')
    menu_item12 = MenuItem(price=2.99, name='Chocolate Chip Cookie', description='Classic chocolate chip cookie', veg=True, category='dessert', img_url='https://images.unsplash.com/photo-1605243614624-277f48f46d52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')
    menu_item13 = MenuItem(price=3.49, name='Lemonade', description='Freshly squeezed lemonade', veg=True, category='drinks', img_url='https://images.unsplash.com/photo-1623084918745-700fd8929eee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80')
    menu_item14 = MenuItem(price=5.99, name='Cheesecake', description='Creamy cheesecake with graham cracker crust', veg=True, category='dessert', img_url='https://images.unsplash.com/photo-1567171466295-4afa63d45416?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80')
    menu_item15 = MenuItem(price=3.99, name='Matcha', description='sweetened green tea with choice of milk', veg=True, category='drinks', img_url='https://images.unsplash.com/photo-1515823064-d6e0c04616a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80')
    menu_item16 = MenuItem(price=4.99, name='Hot Chocolate', description='Rich and creamy hot chocolate with whipped cream', veg=True, category='drinks', img_url='https://images.unsplash.com/photo-1517578239113-b03992dcdd25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')
    menu_item17 = MenuItem(price=5.99, name='Tiramisu', description='Layered dessert with coffee-soaked ladyfingers and mascarpone cream', veg=True, category='dessert', img_url='https://images.unsplash.com/photo-1639744211487-b27e3551b07c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80')
    menu_item18 = MenuItem(price=3.99, name='Iced Tea', description='Refreshing iced tea with lemon', veg=True, category='drinks', img_url='https://images.unsplash.com/photo-1499961024600-ad094db305cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')
    menu_item19 = MenuItem(price=7.99, name='Fruit Salad', description='Fresh cut fruit with a side of yogurt', veg=True, category='dessert', img_url='https://images.unsplash.com/photo-1568308853224-1f17b4084076?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80')

    print("Committing Menu data...")
    # add menu items to database
    db.session.add_all([ menu_item5, menu_item6, menu_item1, menu_item2, menu_item3, menu_item7, menu_item8, menu_item4, menu_item9, menu_item10, menu_item11, menu_item12, menu_item13, menu_item14, menu_item15, menu_item16, menu_item17, menu_item18])
    db.session.commit()

    print("Seeding orderitem data...")
    # create some order items
    order_item1 = OrderItem(quantity=2, menuitem_id=1, receipt_id=2)
    order_item2 = OrderItem(quantity=1, menuitem_id=2, receipt_id=1)
    order_item8 = OrderItem(quantity=3, menuitem_id=3, receipt_id=2)
    order_item3 = OrderItem(quantity=1, menuitem_id=3, receipt_id=1)
    order_item4 = OrderItem(quantity=3, menuitem_id=5, receipt_id=2)
    order_item5 = OrderItem(quantity=2, menuitem_id=6, receipt_id=3)
    order_item6 = OrderItem(quantity=1, menuitem_id=8, receipt_id=4)
    order_item7 = OrderItem(quantity=1, menuitem_id=10, receipt_id=2)
    # orderitems = [order_item1, order_item2, order_item3]

    print("Seeding receipt data...")
    # create a receipt
    receipt = Receipt(user_id=1, total=22.97, completed=True)
    receipt1 = Receipt(user_id=2, total=17.96, completed=True)
    receipt2 = Receipt(user_id=3, total=31.92, completed=True)
    receipt3 = Receipt(user_id=2, total=9.97, completed=False)
    receipt4 = Receipt(user_id=1, total=29.95, completed=True)

    print("Seeding user data...")
    # create a user
    user1 = User(username='gabygaby', customer=True)
    user1.password_hash = 'password'  # set password
    
    user2 = User(username='jane_doe', customer=False)
    user2.password_hash = 'password1'  # set password

    print("Commiting orderitem data...")
    # add order items to database
    db.session.add_all([order_item1, order_item2, order_item3, order_item4, order_item5, order_item6, order_item7])
    db.session.commit()


    print("Commiting user data...")
    # add user to database
    db.session.add_all([user1, user2])
    db.session.commit()

    print("Commiting receipt data...")
    # add receipt to database
    db.session.add_all([receipt, receipt1, receipt2, receipt3, receipt4])
    db.session.commit()
   
    
