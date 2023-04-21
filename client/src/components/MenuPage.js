import React, { useState, useEffect } from 'react'
import { Grid, Menu, Button } from 'semantic-ui-react'
import ItemCard from './ItemCard'

const MenuPage = ({ currentUser, currentReceipt }) => {
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

  useEffect(() => {
    const filtered = menuItems.filter(item => {
      if (category === 'all') {
        return true;
      } else {
        return item.category === category;
      }
    });
    setFilteredItems(filtered);
  }, [menuItems, category]);

  const deleteItem = (id) => {
    const updatedItems = menuItems.filter(item => item.id !== id)
    setMenuItems(updatedItems)
    setFilteredItems(updatedItems)
  }

  const updateItem = (updatedItem) => {
    const newItems = menuItems.map(item => {
      if (item.id === updatedItem.id) {
        return updatedItem
      } else {
        return item
      }
    })
    setMenuItems(newItems)
    setFilteredItems(newItems)
  }

  const handleFilter = (value) => {
    setCategory(value)
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
          { currentUser && <>  
            {currentUser?.customer ? (null) :
            (<Button>Add Item</Button>
            )}</>}
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Grid Columns={2} stackable>
            { filteredItems.map(item => (
              <Grid.Column key={item.id} computer={8} tablet={16} mobile={16}>
                <ItemCard item={item} currentUser={currentUser} onDeleteItem={deleteItem} currentReceipt={currentReceipt}/>
              </Grid.Column>
            )) }
          </Grid>
        </Grid.Column>
      </Grid>
    )
}

export default MenuPage
