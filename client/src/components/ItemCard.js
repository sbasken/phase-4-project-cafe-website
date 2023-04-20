import React from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item, currentUser, onDeleteItem }) => {

    const addToCart = (id) => {
        // fetch('/orderitem', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(orderItemObj)
        // })
    }

    const handleDelete = () => {
        console.log("delete!")
        fetch(`/menu/${item.id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                res.json().then(() => onDeleteItem(item.id))
        }}
        )
    }

  return (
    <Card>
    <Image src='https://images.seattletimes.com/wp-content/uploads/2019/11/11122019_burgers_144441.jpg?d=780x520' wrapped ui={false} />
    <Card.Content>
      <Card.Header>{item.name}</Card.Header>
      <Card.Meta>
        <span>Price: ${item.price}</span>
      </Card.Meta>
      <Card.Description>
        {item.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div>
        <Icon name='food' />
        {item.veg? "vegetarian friendly" : "Contains meat"}
      </div>
    </Card.Content>
    { currentUser.customer ? 
        (<Button animated='vertical' onClick={addToCart}>
            <Button.Content hidden>Add to Cart</Button.Content>
            <Button.Content visible>
                <Icon name='shop' />
            </Button.Content>
        </Button> ): (
            <div>
              <Button floated='right' as={Link} to={`/menu/${item.id}`} >
              <Icon name='edit'/>Edit</Button>
              <Button floated='right'onClick={handleDelete}>
                <Icon name='delete'/>Delete</Button>
            </div>
    )}
    
  </Card>
  )
}

export default ItemCard