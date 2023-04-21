import React, { useState, useEffect } from 'react';
import { Card, Container, Button } from 'semantic-ui-react';

function Orders({currentUser}) {
  const [receipts, setReceipts] = useState([]);


  useEffect(() => {
    fetch('/receipts', { credentials: 'include' })
      .then(response => response.json())
      .then(data => setReceipts(data))
      .catch(error => console.log(error));
  }, []);

  console.log(receipts)

  const handleCompleteReceipt = (receipt) => {
    console.log(`in patch ${receipt}`)
    fetch(`/receipts/${receipt}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: true }),
    })
      .then(response => response.json())
      .then(data => {
        setReceipts(prevReceipts => prevReceipts.map(receipt => {
          if (receipt.id === data.id) {
            return data;
          }
          return receipt;
        }));
      })
      .catch(error => console.log(error));
  }

  const completedReceipts = receipts.filter(receipt => receipt.completed);
  const activeReceipts = receipts.filter(receipt => !receipt.completed);
console.log(currentUser)
  return (
    <Container>
      <h2>Active Orders</h2>

      <Card.Group centered>
        {activeReceipts.map(receipt => (
          <div key={receipt.id}>
            <Card fluid color='orange'> 
              <Card.Content header={`Receipt ${receipt.id}`}
                meta={`Total: ${receipt.total}`}
              />
              <Card.Content>
                <p>Order Date: {new Date(receipt.created_at).toLocaleString()}</p>
                <p>Status: {receipt.completed ? 'Completed' : 'Active'}</p>
                { currentUser && !currentUser.customer ? (
                  <Button onClick={() => handleCompleteReceipt(receipt.id)}>Mark Completed</Button>
                ): null}

              </Card.Content>
            </Card>
          </div>
        ))}
        {activeReceipts.length === 0 && 
          <Card> 
            <Card.Content header='No Active Orders Found :('/>
            <Card.Content>Check out our <a href="/menu">menu</a> and start an order</Card.Content>
          </Card>
        }
      </Card.Group>

      <h2>Completed Orders</h2>

      <Card.Group centered>
        {completedReceipts.map(receipt => (
          <div key={receipt.id}>
            <Card fluid color='green'> 
              <Card.Content header={`Receipt ${receipt.id}`}
                meta={`Total: ${receipt.total}`}
              />
              <Card.Content>
                <p>Order Date: {new Date(receipt.created_at).toLocaleString()}</p>
                <p>Status: {receipt.completed ? 'Completed' : 'Active'}</p>
                <p>Items: {receipt.menu_item}</p>
              </Card.Content>
            </Card>
          </div>
        ))}
        {completedReceipts.length === 0 && 
          <Card> 
            <Card.Content header='No Completed Orders Found :('/>
            <Card.Content>Check out our <a href="/menu">menu</a> and start an order</Card.Content>
          </Card>
        }
      </Card.Group>
    </Container>
  );
}

export default Orders