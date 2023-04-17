#!/usr/bin/env python3

from flask import make_response, request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User, Recipe

class home(Resource):
    
    def get(self):
        return f'<h1>Welcome to our API!<h1>'
    
api.add_resource(home, '/')
    
if __name__ == '__main__':
    app.run(port=5555, debug=True)