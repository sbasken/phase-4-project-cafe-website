import React from 'react'
import { Button, Checkbox, Form, Radio } from 'semantic-ui-react'
import { useFormik } from "formik";
import * as yup from "yup";

const Signup = () => {

    const formSchema = yup.object().shape({
        username: yup.string()
            .required('Required')
            .min(5, 'Too Short!')
            .max(15, 'Too Long!')
            .required('Required'),
        password: yup.string()
            .min(8, 'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special')
            .minLowercase(1, 'password must contain at least 1 lower case letter')
            .minUppercase(1, 'password must contain at least 1 upper case letter')
            .minNumbers(1, 'password must contain at least 1 number')
            .minSymbols(1, 'password must contain at least 1 special character'),
      })

  return (
    <div>
        <h1>Sign Up Form</h1>
        <Form >
            <Form.Field>
                <label>Username</label>
                <input placeholder='Username' />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input placeholder='Password' />
            </Form.Field>
            <Radio slider label="Owner?"/>
            <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button type='submit'>Sign Up</Button>
        </Form>
    </div>
  )
}

export default Signup