import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const ItemCard = ({ item }) => {
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
  </Card>
  )
}

export default ItemCard