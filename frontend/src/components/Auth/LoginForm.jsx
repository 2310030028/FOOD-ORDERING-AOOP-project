import { Button, Typography, Box } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { TextField } from '@mui/material'
import * as Yup from 'yup'
import './LoginForm.css'
import { useNavigate } from 'react-router-dom' // Corrected import statement
import { useDispatch } from 'react-redux'
import { loginUser } from '../../State/Authentication/Action'
const initialValues = {
    email: "",
    password: ""
}

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required')
})

export const LoginForm = () => {
    const dispatch=useDispatch()
    const handleSubmit = (values) => {
        // console.log(values);
        dispatch(loginUser({userData:values,navigate}))
    }
    const navigate = useNavigate();
    return (
        <div className="login-form-container">
            <Typography variant='h5' className='text-center'>
                Login
            </Typography>
            <Formik 
                onSubmit={handleSubmit} 
                initialValues={initialValues} 
                validationSchema={validationSchema}
            >
                <Form>
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
                    <Button sx={{mt:2,padding:"1rem"}} className="login-button" fullWidth type='submit' variant='contained'>Login</Button>
                </Form>
            </Formik>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}>
                <Typography variant='body2' sx={{ color: 'white', mr: 1 }}>
                    Don't have Account?
                </Typography>
                <Button size='small' onClick={() => navigate('/account/register')} sx={{ color: 'rgb(233, 30, 99)' }}>
                    Register
                </Button>
            </Box>

        </div>
    )
}
