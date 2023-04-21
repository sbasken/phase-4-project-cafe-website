import React, { useState, useEffect } from 'react';
import { Card, Button, Icon, Container, Modal, Grid, Image, Segment, Header } from 'semantic-ui-react';
import {useNavigate} from 'react-router-dom'

function Cart({currentReceipt}) {
  const [orderItems, setOrderItems] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate()

  console.log(currentReceipt)

  useEffect(() => {
    fetch('/orderitem', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        setOrderItems(data);
        setTotal(data.reduce((acc, item) => acc + item.menuitem.price * item.quantity, 0));
      })
      .catch(error => console.log(error));
  }, []);

  const handleAdd = (item) => {
    if (item.quantity >= 0) {
      fetch(`/orderitem/${item.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: item.quantity += 1,
        })
      })
        .then(res => res.json())
        .then(() => updateQuantity(item));
    }
  };
  
  const handleMinus = (item) => {
    if (item.quantity >= 0) {
      fetch(`/orderitem/${item.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: item.quantity -= 1,
        })
      })
        .then(res => res.json())
        .then(() => updateQuantity(item));
    } else {
      setDeleteItem(item);
    }
  };

  const handleDelete = (deleteItem) => {
    fetch(`/orderitem/${deleteItem.id}`, {
      method: 'DELETE'
    })
    .then(res => {
      if (res.ok) {
        setOrderItems(orderItems.filter(orderItem => orderItem.id !== deleteItem.id));
        setDeleteItem(null);
        setTotal(orderItems.filter(orderItem => orderItem.id !== deleteItem.id).reduce((acc, item) => acc + item.menuitem.price * item.quantity, 0));

      } else {
        throw new Error('Unexpected response');
      }
    })
    .catch(error => console.log(error));
  };

  const updateQuantity = (quantityChange) => {
    const updatedItem = orderItems.map((item) => item.id === quantityChange.id ? quantityChange : item);
    setOrderItems(updatedItem);
    setTotal(updatedItem.reduce((acc, item) => acc + item.menuitem.price * item.quantity, 0));
  };

  const handleCheckout = (currentReceipt) => {
    console.log(currentReceipt.id)
    fetch(`/receipts/${currentReceipt.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        total: total,
      })
    })
      .then(res => res.json())
      .then(data => {console.log(data)
      navigate('/orders')
      setOrderItems(null)})
      .catch(error => console.log(error));
  };
console.log(total)
  return (

    <Container>
      <h2>Cart</h2>
      <Grid centered>
        <Grid.Column width={6}>

      <Card.Group centered>
        {orderItems.map(item => (
          <div key={item.id}>
            <Card fluid color='orange'>
              <Image src={item.menuitem.img_url} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <Card.Content header={item.menuitem.name} meta={item.menuitem.price} />
              <Card.Content>
                <Button.Group>
                  <Button onClick={() => handleMinus(item)}><Icon name='minus' /></Button>
                  <Button.Or text={item.quantity} />
                  <Button onClick={() => handleAdd(item)}><Icon name='plus' /></Button>
                </Button.Group>
                <Button floated='right' onClick={() => setDeleteItem(item)}><Icon name='trash' /></Button>
              </Card.Content>
            </Card>
            <br/>
          </div>
        ))}
        {orderItems.length === 0 && (
          <Card>
            <Card.Content header='Your Cart is Empty!' />
            <Card.Content>Head to our <a href="/menu">menu</a> to start an order</Card.Content>
          </Card>
        )}
      </Card.Group>
      </Grid.Column>
      <Grid.Column width={4}>
      <Segment>
        <Header>Total</Header>
        <h2>{total}</h2>
        <Button onClick={() => handleCheckout(currentReceipt)}>Place Order</Button>
      </Segment>
      </Grid.Column>

      <Modal
        open={deleteItem !== null}
        onClose={() => setDeleteItem(null)}
        size='tiny'
      >
        <Modal.Header>Are you sure you want to delete this item?</Modal.Header>
        <Modal.Content>
          <p>{deleteItem && deleteItem.menuitem.name}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => handleDelete(deleteItem)}>Delete</Button>
          <Button onClick={() => setDeleteItem(null)}>Cancel</Button>
        </Modal.Actions>
      </Modal>
      </Grid>
    </Container>
  );
}


export default Cart;