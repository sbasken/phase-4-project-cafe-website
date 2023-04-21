import React from 'react'
import { Grid, Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import ItemCard from './ItemCard'

const MenuPage = ({ currentUser, currentReceipt, handleFilter, filteredItems, deleteItem }) => {

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
            (<Button as={Link} to='/newitem'>Add Item</Button>
            )}</>}
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Grid Columns={2} stackable>
            { filteredItems.map(item => (
              <Grid.Column key={item.id} computer={8} tablet={16} mobile={16}>
                <ItemCard 
                  item={item} 
                  currentUser={currentUser} 
                  onDeleteItem={deleteItem} 
                  currentReceipt={currentReceipt}
                />
              </Grid.Column>
            )) }
          </Grid>
        </Grid.Column>
      </Grid>
    )
}

export default MenuPage
