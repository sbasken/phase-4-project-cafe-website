import React, { useState } from 'react'
import { Segment, Grid, Form, Button } from 'semantic-ui-react'
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom'

const Login = ({setCurrentUser, setCurrentReceipt}) => {

    const navigate = useNavigate();

    const formSchema = yup.object({
        username: yup.string().required('Field required'),
        password: yup.string().required('Field required'),
    });

    const formik = useFormik({
        initialValues: {
          username: "",
          password: ""
        },
        
        validationSchema: formSchema,
        onSubmit:( values) => {
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
            .then(res => {
                if (res.ok) {
                    res.json().then((user) => {setCurrentUser(user)
                      const obj = {  user_id : 'user.id' }
                      console.log(obj)
                      fetch('/receipts', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({  user_id : user.id })
                      })
                    .then(res => { 
                      if (res.ok) {
                        res.json()
                      .then(receipt => setCurrentReceipt(receipt))
                      navigate('/')}
                    })
                    })
                    }
            else {
                alert('Oops, username and password don\'t match');
            }})


        }
    })

  return (
    <>
    <Segment secondary>
      <Grid >
        <Grid.Column verticalAlign='middle' >
          <Form onSubmit={formik.handleSubmit}>
          <h1>Login to Place an Order</h1>
          <br/>
            <Form.Field >
              <label>Username:</label>
              <Form.Input
                name="username"
                type="text"
                placeholder="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              <p style={{ color: "red" }}> {formik.errors.username}</p>
            </Form.Field>
            <br/>
            <Form.Field>
              <label>Password:</label> 
              <Form.Input
                name="password"
                type="password"
                placeholder="Password"
                value={formik.values.password} 
                onChange={formik.handleChange}
              />
              <p style={{ color: "red" }}> {formik.errors.password}</p>
              </Form.Field>
              <br/>
              <Button 
              className='ui button' 
              type='submit'>Log In</Button>
              <br/>
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
        <h4 style={{textAlign:'center'}}>No Account? Sign up <Link to="/signup">here</Link></h4>
    </>
  )
}

export default Login