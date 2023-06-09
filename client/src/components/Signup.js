import React from 'react'
import { Button, Checkbox, Form, Radio } from 'semantic-ui-react'
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom'

const Signup = ({ setCurrentUser, setCurrentReceipt }) => {
    let navigate = useNavigate();

    const formSchema = yup.object().shape({
        username: yup.string()
            .required('Required')
            .min(5, 'Username needs to be at least 5 characters long.')
            .max(15, 'Username needs to be at least 5 characters long.')
            .required('Required'),
        password: yup.string()
            .required('No password provided.') 
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/[\d\w]/, 'Password can only contain letters and numbers.'),
        confirm_password: yup.string()
            .oneOf([yup.ref("password")], "Passwords do not match")
            .required("Password Confirm is required"),
        agreeTS: yup.boolean()
            .required("The terms and conditions must be accepted.")
            .oneOf([true], "The terms and conditions must be accepted."),
      })

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            customer: true
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log("Creating a user...")
            if (formik.isValid) {
                fetch('/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                }).then(res => {
                        if (res.ok) {
                            res.json().then( (new_user) => {
                                setCurrentUser(new_user)
                                console.log("User successfully created!")
                                    if (new_user.customer === true) {
                                        fetch('/receipts', {
                                        method: 'POST',
                                        headers: {
                                        'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({  user_id : new_user.id })
                                        })
                                        .then(res => { 
                                        if (res.ok) {
                                            res.json()
                                        .then(receipt => {
                                            console.log(receipt)
                                            setCurrentReceipt(receipt)
                                        })
                                        navigate('/home')}
                                    })}
                            })
                            navigate('/home')
                        } else {
                            res.json().then( err => {
                                console.log(err)
                                alert('Oops, username is already taken. Please choose another one.')
                            })
                        }
                    })

            }
        }

    })

  return (
    <div>
        <h1>Sign up Form</h1>
        <Form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
            <Form.Field validate>
                <label>Username</label>
                <input 
                    type="text"
                    name="username"
                    placeholder='Username' 
                    value={formik.values.username}
                    onChange={formik.handleChange}
                />
                <p style={{ color: "purple" }}> {formik.errors.username}</p>

            </Form.Field>
            <Form.Field validate>
                <label>Password</label>
                <input 
                    id="password"
                    name="password"
                    type="password"
                    placeholder='Password' 
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
                <p style={{ color: "purple" }}> {formik.errors.password}</p>
            </Form.Field>
            <Form.Field validate>
                <label>Confirm Password</label>
                <input 
                    id="confirm-password"
                    name="confirm_password"
                    type="password"
                    placeholder='Confirm password' 
                    onChange={formik.handleChange}
                    value={formik.values.confirm_password}
                />
                <p style={{ color: "purple" }}> { formik.errors.confirm_password }</p>
            </Form.Field>
            <Radio 
                slider 
                label="Owner?"
                checked= {!formik.values.customer}
                onChange={() => formik.setFieldValue("customer", !formik.values.customer)}
                />
            <Form.Field validate>
            <label>
                <Checkbox 
                    id="checkbox-agree-ts"
                    name="agreeTS"
                    checked={formik.values.agreeTS}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                I agree to the Terms and Conditions
            </label>
                <p style={{ color: "purple" }}> { formik.errors.agreeTS }</p>
            </Form.Field>
            <Button
              className='ui button' 
              onClick={formik.handleSubmit}
              type='submit'>Sign Up</Button>
        </Form>
    </div>
  )
}

export default Signup