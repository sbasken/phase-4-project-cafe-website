import React, { useState, useEffect } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import ItemCard from './ItemCard'

const MenuPage = ({ currentUser, setCurrentUser }) => {
  const [ menuItems, setMenuItems ] = useState([])
  const [ category, setCategory ] = useState('all')
  const [ filteredItems, setFilteredItems ] = useState([])
  
  useEffect(() => {
    fetch("/menu")
    .then(res => res.json())
    .then(data => {
      setMenuItems(data)
      setFilteredItems(data)
    });
  }, [])
  

  const deleteItem = (id) => {
    const updatedItems = menuItems.filter(item => item.id !== id)
    setMenuItems(updatedItems)
  }

  const handleFilter = (value) => {
    setCategory(value)
    const items = menuItems.filter( item => {
      if (value === 'all') {
        return true;
      } else {
          return item.category === value;
        }
    }
    )
    setFilteredItems(items)
  }
  
  return (
    <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name='All'
              value='all'
              onClick={(e) => handleFilter(e.target.getAttribute('value'))}
            />
            <Menu.Item
              name='Drinks'
              value='drinks'
              onClick={(e) => handleFilter(e.target.getAttribute('value'))}
            />
            <Menu.Item
              name='food'
              value='food'
              onClick={(e) => handleFilter(e.target.getAttribute('value'))}
            />
            <Menu.Item
              name='Dessert'
              value='dessert'
              onClick={(e) => handleFilter(e.target.getAttribute('value'))}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Grid Columns={2} stackable>
            { filteredItems.map(item => (
              <Grid.Column key={item.id} computer={8} tablet={16} mobile={16}>
                <ItemCard item={item} currentUser={currentUser} onDeleteItem={deleteItem}/>
              </Grid.Column>
            )) }
          </Grid>
        </Grid.Column>
      </Grid>
    )
}

export default MenuPage
