import React, { useState, useEffect } from 'react';
import { Card, Button, Icon, Container } from 'semantic-ui-react';

function Cart() {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    fetch('/orderitem', { credentials: 'include' })
      .then(response => response.json())
      // .then(data => console.log(data))
      .then(data => setOrderItems(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <Container>
      <h2>Cart</h2>

      <Card.Group centered>
      {orderItems.map(item => (
        <div key={item.id}>
          <Card fluid color='orange'> 
          <Card.Content header={item.menuitem.name}
          meta={item.menuitem.description}/>
          <Card.Content>
          <Button.Group>
            <Button> <Icon name='minus' /> </Button>
            <Button.Or text={item.quantity} />
            <Button> <Icon name='plus' /> </Button>
          </Button.Group>
          <Button floated='right'> <Icon name='trash' /> </Button>
          </Card.Content>
          </Card>
        </div>
      ))}
      {orderItems.length === 0 && 
      <Card> 
        <Card.Content header='Your Cart is Empty!'/>
          <Card.Content>Head to our <a href="/menu">menu</a> to start an order</Card.Content>
      </Card>}
      </Card.Group>
    </Container>
  );
}

export default Cart;