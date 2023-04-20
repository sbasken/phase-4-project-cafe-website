import React, { useState, useEffect } from 'react';

function Cart() {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    fetch('/orderitem', { credentials: 'include' })
      .then(response => response.json())
      .then(data => console.log(data))
      // .then(data => setOrderItems(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>Cart</h2>
      {orderItems.map(item => (
        <div key={item.id}>
          <p>Item: {item.menuitem.name}</p>
          <p>Quantity: {item.quantity}</p>
          <button>Delete</button>
        </div>
      ))}
      {orderItems.length === 0 && <p>Your cart is empty</p>}
    </div>
  );
}

export default Cart;