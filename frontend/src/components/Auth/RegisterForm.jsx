import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './RegisterForm.css'; // Import external CSS file
import { registerUser } from '../../State/Authentication/Action';
import { useDispatch } from 'react-redux'

const initialValues = {
    FullName: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER"
}

const validationSchema = Yup.object({
    FullName: Yup.string().required("Full name is required"),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().required('Role is required') // Add validation for role
})

export const RegisterForm = () => {
    const dispatch=useDispatch()
    const handleSubmit = (values) => {
        console.log("form values",values);
        dispatch(registerUser({userData:values,navigate}))
    }
    const navigate = useNavigate();
    return (
        <div className="login-form-container">
            <Typography variant='h5' className='text-center'>
                Register
            </Typography>
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                <Form>
                    <Field
                        as={TextField}
                        name="FullName"
                        label="Full Name"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        className="custom-text-field"
                    />
                    <ErrorMessage name="FullName" component="div" className="error-message" />
                    <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        className="custom-text-field"
                    />
                    <ErrorMessage name="email" component="div" className="error-message" />
                    <Field
                        as={TextField}
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        className="custom-text-field"
                    />
                    <ErrorMessage name="password" component="div" className="error-message" />
                    {/* <FormControl fullWidth margin="normal"> */}
                        <InputLabel id="role-select-label" className="custom-text-field">Role</InputLabel>
                        <Field 
                        fullWidth
                          margin="normal"
                            as={Select}
                            labelId="role-select-label"
                            name="role"
                            // label="Role"
                            className="custom-text-field"
                        >
                            <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                            <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
                        </Field>
                        <ErrorMessage name="role" component="div" className="error-message" />
                    {/* </FormControl> */}
                    <Button sx={{ mt: 2, padding: "1rem" }} className="login-button" fullWidth type='submit' variant='contained'>Register</Button>
                </Form>
            </Formik>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}>
                <Typography variant='body2' sx={{ color: 'white', mr: 1 }}>
                    If have an Account Already?
                </Typography>
                <Button size='small' onClick={() => navigate('/account/login')} sx={{ color: 'rgb(233, 30, 99)' }}>
                    Login
                </Button>
            </Box>
        </div>
    )
}
