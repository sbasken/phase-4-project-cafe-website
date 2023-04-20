import React, { useState, useEffect } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import ItemCard from './ItemCard'

const MenuPage = ({ currentUser }) => {
  const [ menuItems, setMenuItems ] = useState([])
  const [ category, setCategory] = useState('')

  useEffect(() => {
    fetch("/menu")
    .then(res => res.json())
    .then(setMenuItems);
  }, [])
  
  return (
    <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name='Drinks'
              onClick={setCategory}
            />
            <Menu.Item
              name='Dood'
              onClick={setCategory}
            />
            <Menu.Item
              name='Dessert'
              onClick={setCategory}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={10}>
          <Segment>
            { menuItems.map(item => <ItemCard key={item.id} item={item} currentUser={currentUser} />) }
          </Segment>
        </Grid.Column>
      </Grid>
    )
}

export default MenuPage