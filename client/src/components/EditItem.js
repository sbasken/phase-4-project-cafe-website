import React, { useState, useEffect } from 'react'
import { Form } from 'semantic-ui-react'
import { useParams, useNavigate } from 'react-router-dom'

const categories = [
    { key: 'd', text: 'Drinks', value: 'drinks' },
    { key: 'f', text: 'Food', value: 'food' },
    { key: 'd', text: 'Dessert', value: 'dessert' }
  ]

const options = [
    { key: 'v', text: 'Veggie', value: 'true' },
    { key: 'r', text: 'Regular', value: 'false' }
  ]

const EditItem = ({ onUpdateItem }) => {
    const [ formData, setFormData ] = useState({
        name: "",
        price: 0,
        category: "",
        veggie: "",
        description: ""
    })
    const { name, price, category, veggie, description } = formData
    const { id } = useParams()
    const navigate = useNavigate();

    
    useEffect(() => {
        fetch(`/menu/${id}`)
        .then(res => res.json())
        .then(setFormData)
    }, [id])
    
    const handleChange = (e) => {
        const key = e.target.name
        const value = e.target.value
        setFormData({
            ...formData,
            [key]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`/menu/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (res.ok) {
                    res.json().then(updatedItem => onUpdateItem(updatedItem))
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
            name='veggie'
            value={veggie}
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

export default EditItem