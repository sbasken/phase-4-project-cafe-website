import React from 'react'
import { Button, Checkbox, Form, Radio } from 'semantic-ui-react'
import { useFormik } from "formik";
import * as yup from "yup";

const Signup = ({ setCurrentUser }) => {

    const formSchema = yup.object().shape({
        username: yup.string()
            .required('Required')
            .min(5, 'Too Short!')
            .max(15, 'Too Long!')
            .required('Required'),
        password: yup.string()
            .required('No password provided.') 
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
      })

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            customer: true
        },
        validationSchema: formSchema,
        onSubmit: values => {
            fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
                .then(res => {
                    if (res.ok) {
                        res.json().then( new_user => setCurrentUser(new_user))
                    } else {
                        res.json().then( err => console.log(err))
                    }
                })
        }

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