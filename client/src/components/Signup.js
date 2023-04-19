import React, { useState } from 'react'
import { Button, Checkbox, Form, Radio } from 'semantic-ui-react'
import { useFormik } from "formik";
import * as yup from "yup";

const Signup = ({ setCurrentUser }) => {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const formSchema = yup.object().shape({
        username: yup.string()
            .required('Required')
            .min(5, 'Too Short!')
            .max(15, 'Too Long!')
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
        validationScheme: formSchema,
        onSubmit: (values) => {
            console.log("hello!")
            setFormSubmitted(true);
            fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then(res => {
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
        <Form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
            <Form.Field>
                <label>Username</label>
                <input 
                    type="text"
                    name="username"
                    autoComplete="off"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    placeholder='Username' 
                />
                {/* {formSubmitted && ( */}
                <p style={{ color: "red" }}> {formik.errors.username}</p>
                {/* )} */}
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input 
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder='Password' 
                />
                {/* {formSubmitted && ( */}
                <p style={{ color: "red" }}> {formik.errors.password}</p>
                {/* )} */}
            </Form.Field>
            <Form.Field>
                <label>Confirm Password</label>
                <input 
                    id="confirm-password"
                    name="confirm_password"
                    type="password"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    value={formik.values.confirm_password}
                    placeholder='Confirm password' 
                />
                {/* {formSubmitted && ( */}
                <p style={{ color: "red" }}> { formik.errors.confirm_password }</p>
                {/* )} */}
            </Form.Field>
            <Radio slider label="Owner?"/>
            <Form.Field>
                <Checkbox 
                    id="checkbox-agree-ts"
                    fitted
                    name="agreeTS"
                    label={
                        <label>
                        I agree to the Terms and Conditions
                        </label>
                    }
                    
                    />
                {/* {formSubmitted && ( */}
                <p style={{ color: "red" }}> { formik.errors.agreeTS }</p>
                {/* )} */}
            </Form.Field>
            <Button 
              className='ui button' 
              type='submit'>Sign Up</Button>
        </Form>
    </div>
  )
}

export default Signup