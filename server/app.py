#!/usr/bin/env python3

from flask import make_response, request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, api, db
from models import User, MenuItem

class home(Resource):
    
    def get(self):
        return f'<h1>Welcome to our API!<h1>'
    
class menuItems(Resource):

    def get(self):
        menu = [item.to_dict() for item in MenuItem.query.all()]
        return make_response(menu, 200)
    
api.add_resource(home, '/')
api.add_resource(menuItems, '/menu')
    
if __name__ == '__main__':
    app.run(port=5555, debug=True)