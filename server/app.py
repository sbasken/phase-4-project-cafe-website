#!/usr/bin/env python3

from flask import jsonify, make_response, request, session, render_template
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError


from config import app, api, db
from models import User, MenuItem, OrderItem, Receipt

@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")

class Signup(Resource):

    def post(self):
        data = request.get_json()
        print(data)
        try:
            new_user = User(
                username = data['username'],
                customer = data['customer']
            )
            new_user.password_hash = data['password']
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return make_response(new_user.to_dict(), 201)

        except:
            return make_response({'error': 'Unprocessable Entity'}, 422)

class CheckSession(Resource):

    def get(self):
        user_id = session.get('user_id')
        
        if not user_id:
            return {'error': 'Unauthorized'}, 401
        
        current_user = User.query.filter(User.id == user_id).first()
        return current_user.to_dict(), 200

class Login(Resource):
    
    def post(self):
        data = request.get_json()

        check_user = User.query.filter(User.username == data['username']).first()
        
        if check_user and check_user.authenticate(data['password']):
            session['user_id'] = check_user.id

            return make_response(check_user.to_dict(), 200)
        return {'error': 'Unauthorized'}, 401
        

class Logout(Resource):

    def delete(self):
        
        if session.get('user_id'):
            session['user_id'] = None
            return {}, 204
        return {'error': '401 Unauthorized'}, 401

class Home(Resource):
    
    def get(self):

        return f'<h1>Welcome to our API!<h1>'
    
class MenuItems(Resource):

    def get(self):

        menu = [item.to_dict() for item in MenuItem.query.all()]
        return make_response(menu, 200)
    
    def post (self):
        
        if session.get('user_id'):
            found_user = User.query.filter(User.id == session.get('user_id')).first()
            if found_user.customer == False:
                new = request.get_json()
                
                new_item = MenuItem(
                    price = new['price'],
                    name = new['name'],
                    description = new['description'],
                    veg = new['veg'],
                    category = new['category'],
                    img_url = new['img_url']
                )

                db.session.add(new_item)
                db.session.commit()

                return make_response(new_item.to_dict(), 201)
            return {'error': 'Unauthorized'}, 401
    
class MenuItemByID(Resource):

    def get(self, id):

        item = MenuItem.query.filter(MenuItem.id==id).first()
        return make_response(item.to_dict(), 200)
    
    def patch(self, id):
        print(id)
        
        if session.get('user_id'):
            found_user = User.query.filter(User.id == session.get('user_id')).first()
            print(found_user)
            if found_user.customer == False:
                data = request.get_json()
                to_update = MenuItem.query.filter_by(id=id).first()
                
                for key in data:
                    setattr(to_update, key, data[key])
                
                db.session.add(to_update)
                db.session.commit()
                return make_response(to_update.to_dict(), 200)
            return {'error': 'Unauthorized'}, 401
        return {'error': 'Unauthorized'}, 401
        
    def delete(self, id):

        to_delete = MenuItem.query.filter(MenuItem.id==id).first()
        db.session.delete(to_delete)
        db.session.commit()
        
        return make_response({'message': 'Item successfully deleted!'}, 204)

class OrderItems(Resource):
    def get(self):
        if session.get('user_id'):
            # user = User.query.filter(User.id == session.get('user_id')).first()
            # print(user.order_items)
            # order_items = user.order_items
            # print([order_items])
            # order_items = OrderItem.query.filter(OrderItem.id == currentUser).all()
            order_items = OrderItem.query.join(Receipt.order_items).filter(Receipt.user_id == session.get('user_id')).all()

            order_items_dict = [item.to_dict() for item in order_items]
        
            
            return make_response(order_items_dict, 200)
    
    def post(self):

        if session.get('user_id'):
            found_user = User.query.filter(User.id == session.get('user_id')).first()
            if found_user:
                new = request.get_json()
                
                order_item = OrderItem(
                    quantity = new['quantity'],
                    menuitem_id = new['menuitem_id'],
                    receipt_id = new['receipt_id']
                )

                db.session.add(order_item)
                db.session.commit()

                return make_response(order_item.to_dict(), 201)
            return {'error': 'Unauthorized'}, 401
        
class OrderItemByID(Resource):
    def patch(self, id):
        if session.get('user_id'):
            found_user = User.query.filter(User.id == session.get('user_id')).first()
            if found_user:
                data = request.get_json()
                order_update = OrderItem.query.filter_by(id=id).first()
                print(order_update.quantity)

                if order_update:
                    for attr in data:
                        setattr(order_update, attr, data[attr])
                    db.session.add(order_update)
                    db.session.commit()
                    return make_response(order_update.to_dict(), 200)
                else:
                    return {'error': 'OrderItem not found'}, 404
            return {'error': 'Unauthorized'}, 401 
        return {'error': 'Unauthorized'}, 401
    
    def delete(self, id):

        to_delete = OrderItem.query.filter(OrderItem.id==id).first()
        db.session.delete(to_delete)
        db.session.commit()
        
        return make_response({'orderitem' : 'deleted'}, 204)

class ReceiptByID(Resource):
    def get(self, id):
        receipt = Receipt.query.filter_by(id=id).first()
        if receipt:
            return make_response(receipt.to_dict(), 200)
        return {'error': 'Not Found'}, 404
    
    def patch(self, id):
        print(id)
        if session.get('user_id'):
            found_user = User.query.filter(User.id == session.get('user_id')).first()
            if found_user:
                data = request.get_json()
                print(data)
                to_update = Receipt.query.filter_by(id = id).first()
                print(to_update)
                if to_update:
                    for attr in data:
                        setattr(to_update, attr, data[attr])
                    db.session.add(to_update)
                    db.session.commit()
                    return make_response(to_update.to_dict(), 200)
                else:
                    return {'error': 'Receipt not found'}, 404
            return {'error': 'Unauthorized'}, 401 
        return {'error': 'Unauthorized'}, 401
    
class Receipts(Resource):

    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user.customer == True:
            receipt = Receipt.query.filter(Receipt.user_id == session.get('user_id')).all()
            if receipt:
                receipts = [item.to_dict() for item in receipt]
                print(receipts)
                return make_response(receipts, 200)
        else:
            all_receipts = [receipt.to_dict() for receipt in Receipt.query.all()]
            return make_response(all_receipts, 200)
            
        return {'error': 'Not Found'}, 404
    
    
    def post(self):
        
        new = request.get_json()
        print(new)
        new_receipt = Receipt()
       
        new_receipt.user_id = new['user_id']
        new_receipt.total = 0.00
        new_receipt.completed = False

        # new_receipt = Receipt(
        # user_id=new['user_id'])

        db.session.add(new_receipt)
        db.session.commit()
        return make_response(new_receipt.to_dict(), 201)
    

api.add_resource(Home, '/home')
api.add_resource(MenuItems, '/menu')
api.add_resource(MenuItemByID, '/menu/<int:id>')
api.add_resource(OrderItems, '/orderitem')
api.add_resource(OrderItemByID, '/orderitem/<int:id>')
api.add_resource(Receipts, '/receipts')
api.add_resource(ReceiptByID, '/receipts/<int:id>')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')

    
if __name__ == '__main__':
    app.run(port=5555, debug=True)