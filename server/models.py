from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

class MenuItem(db.Model, SerializerMixin):
    __tablename__ = 'menuitems'

    serialize_rules = ('-order_items', '-created_at', '-updated_at')

    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Float)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    veg = db.Column(db.Boolean)
    category = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    order_items = db.relationship('OrderItem', backref='menuitem')

    @validates('category')
    def validate_category(self, key, category):
        if not category:
            raise ValueError('Category cannot be empty')
        return category
    
    @validates('description')
    def validate_description(self, key, description):
        if len(description) > 100:
            raise ValueError('Description must be less than 100 characters')
        return description

    def ___repr__(self):
        return f'<MenuItem {self.id} * Name: {self.name}, Price: {self.price}>'


class OrderItem(db.Model, SerializerMixin):
    __tablename__ = 'orderitems'

    serialize_rules = ('-created_at', '-updated_at', '-menu_item', '-receipt', '-menuitem_id', '-receipt_id')

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    menuitem_id = db.Column(db.Integer, db.ForeignKey('menuitems.id'), nullable=False)
    receipt_id = db.Column(db.Integer, db.ForeignKey('receipts.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # menu_item = db.relationship('MenuItem', backref='orderitem')
    # receipt = db.relationship('Receipt', backref='orderitem')

    def ___repr__(self):
        return f'<OrderItem {self.id} >'

class Receipt(db.Model, SerializerMixin):
    __tablename__ = 'receipts'

    serialize_rules = ('-order_items', '-customers', '-created_at', '-updated_at', '-user_id')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    total = db.Column(db.Float)
    completed = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    order_items = db.relationship('OrderItem', backref='receipt')
    customers = db.relationship('User', backref='customer_receipt')

    def __repr__(self):
        return f'<Receipt {self.id} * User: {self.user}, Order_items: {self.order_items}, Total: {self.total}>'

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-_password_hash', '-receipts', '-order_items', '-created_at', '-updated_at')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    customer = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    receipts = db.relationship('Receipt', backref='customer')
    order_items = association_proxy('receipts', 'order_item')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def ___repr__(self):
        return f'<User {self.id} * Username: {self.username}, Customer: {self.customer}>'

