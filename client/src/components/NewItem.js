import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'

const categories = [
    { key: 'd', text: 'Drinks', value: 'drinks' },
    { key: 'f', text: 'Food', value: 'food' },
    { key: 'd', text: 'Dessert', value: 'dessert' }
  ]

const options = [
    { key: 'v', text: 'Veggie', value: 'true' },
    { key: 'r', text: 'Regular', value: 'false' }
  ]

const NewItem = ({ onAddItem }) => {
    const [ formData, setFormData ] = useState({
        name: "",
        price: 0,
        category: "",
        veg: "",
        description: "",
        img_url: ""
    })
    const { name, price, img_url, category, veg, description } = formData
    const navigate = useNavigate();
    
    const handleChange = (e, { name, value }) => {
  if (name === 'veg') {
    value = value === 'Veggie';
  }
  setFormData({
    ...formData,
    [name]: value
  });
}
    console.log(formData)

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/menu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (res.ok) {
                    res.json()
                    .then(newItem => {
                        console.log(newItem)
                        onAddItem(newItem)
                    })
                    navigate('/menu')
                } else {
                    res.json().then(err => console.log(err))
                }
            })
    }

  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input 
            fluid 
            label='Name'
            name='name'
            value={name}
            onChange={handleChange}
            placeholder='Item Name' 
            />
          <Form.Input 
            fluid 
            label='Price' 
            name='price'
            value={price}
            onChange={handleChange}
            placeholder='Price' 
        />
          <Form.Input 
            fluid 
            label='Image URL' 
            name='img_url'
            value={img_url}
            onChange={handleChange}
            placeholder='Image URL' 
        />
          <Form.Select
            fluid
            label='Category'
            name='category'
            value={category}
            options={categories}
            onChange={handleChange}
            placeholder='Category'
          />
          <Form.Select
            fluid
            label='Veggie'
            name='veg'
            value={veg}
            options={options}
            onChange={handleChange}
            placeholder='Veggie'
          />
        </Form.Group>
        <Form.TextArea 
            label='Description' 
            name='description'
            value={description}
            onChange={handleChange}
            placeholder='Item description' 
        />
        <Form.Button type='submit' >Submit</Form.Button>
      </Form>
  )
}

export default NewItem
