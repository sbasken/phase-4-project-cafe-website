import React from 'react'
import { Segment, Grid, Form, Button } from 'semantic-ui-react'
import { useFormik } from "formik";
import * as yup from "yup";

const Login = ({setCurrentUser}) => {

    const formSchema = yup.object({
        username: yup.string().required(),
        password: yup.string().required(),
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
            .then((res) => {
                if (res.ok) {
                    res.json().then((user) => setCurrentUser(user))
                }
                
            })
        }
    })

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
                value={formik.values.username}
                onChange={formik.handleChange}
              />
            </Form.Field>
            <br/>
            <Form.Field>
              <label>Password:</label> 
              <Form.Input
                type="password"
                placeholder="Password"
                value={formik.values.password} 
                onChange={formik.handleChange}
              />
              </Form.Field>
              <br/>
              <Button 
              className='ui button'>Log In</Button>
              <br/>
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
        {/* <h4 style={{textAlign:'center'}}>No Account? Sign up <a href="/signup">here</a></h4> */}
    </>
  )
}

export default Login