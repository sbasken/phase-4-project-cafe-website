import React from 'react'
import { Form } from 'semantic-ui-react'

const options = [
    { key: 'c', text: 'Customer', value: 'true' },
    { key: 'o', text: 'Owner', value: 'false' }
  ]

const EditItem = () => {
  return (
    <Form>
        <Form.Group widths='equal'>
          <Form.Input fluid label='First name' placeholder='First name' />
          <Form.Input fluid label='Last name' placeholder='Last name' />
          <Form.Select
            fluid
            label='Gender'
            options={options}
            placeholder='Customer'
          />
        </Form.Group>
        <Form.TextArea label='About' placeholder='Tell us more about you...' />
        <Form.Checkbox label='I agree to the Terms and Conditions' />
        <Form.Button>Submit</Form.Button>
      </Form>
  )
}

export default EditItem