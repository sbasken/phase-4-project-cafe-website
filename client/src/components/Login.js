import React from 'react'
import { Segment, Grid, Form, Divider, Button } from 'semantic-ui-react'

const Login = () => {
  return (
    <>
    <Segment secondary>
      <Grid >
        <Grid.Column verticalAlign='middle' >
          <Form>
          <h1>Login to Place an Order</h1>
          <br/>
            <Form.Field >
              <label>Username:</label>
              <Form.Input
                type="text"
                placeholder="Username"
              />
            </Form.Field>
            <br/>
            <Form.Field>
              <label>Password:</label> 
              <Form.Input
                type="password"
                placeholder="Password"
              />
              </Form.Field>
              <br/>
              <Button 
              className='ui button'
              >Log In</Button>
              <br/>
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
    </>
  )
}

export default Login