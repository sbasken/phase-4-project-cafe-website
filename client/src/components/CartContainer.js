import React, { useState, useEffect } from 'react';
import { Card, Button, Icon, Container } from 'semantic-ui-react';

function CartContainer() {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    fetch('/orderitem', { credentials: 'include' })
      .then(response => response.json())
      // .then(data => console.log(data))
      .then(data => setOrderItems(data))
      .catch(error => console.log(error));
  }, []);
}

export default CartContainer;