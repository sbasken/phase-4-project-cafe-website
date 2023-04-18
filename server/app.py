#!/usr/bin/env python3

from flask import make_response, request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, api, db
from models import User, MenuItem

class Home(Resource):
    
    def get(self):

        return f'<h1>Welcome to our API!<h1>'
    
class MenuItems(Resource):

    def get(self):

        menu = [item.to_dict() for item in MenuItem.query.all()]
        return make_response(menu, 200)
    


class OrderItem(Resource):
    def get(self):

        orderitem = [item.to_dict() for item in OrderItem.query.all()]
        return make_response(orderitem, 200)

api.add_resource(Home, '/')
api.add_resource(MenuItems, '/menu')
api.add_resource(OrderItem, '/orderitem')
    
if __name__ == '__main__':
    app.run(port=5555, debug=True)