import React from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react'

const ItemCard = ({ item, currentUser }) => {
    console.log(item)

    const addToCart = (id) => {
        console.log(id)
        // fetch('/orderitem', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(orderItemObj)
        // })
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
      <a>
        <Icon name='food' />
        {item.veg? "vegetarian friendly" : "Contains meat"}
      </a>
    </Card.Content>
    <Button animated='vertical' onClick={addToCart}>
      <Button.Content hidden>Add to Cart</Button.Content>
      <Button.Content visible>
        <Icon name='shop' />
      </Button.Content>
    </Button>
  </Card>
  )
}

export default ItemCard