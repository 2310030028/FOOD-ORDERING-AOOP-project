import { Box, Modal } from '@mui/material'
// import React, { useEffect } from 'react' // Import useEffect
import { useLocation, useNavigate } from 'react-router-dom' // Import hooks
import {style} from '../Cart/Cart'
import {LoginForm} from './LoginForm'
import {RegisterForm} from './RegisterForm'
export const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Corrected variable name to navigate
    const handleOnClose=()=>{
        navigate('/')
    }

    return (
        <>
            <Modal open={ 
                location.pathname === '/account/register' || location.pathname === '/account/login'}
                onClose={handleOnClose}
            >
                <Box sx={style}>
                    {location.pathname === '/account/register'?<RegisterForm/>:<LoginForm/>}
                </Box>
            </Modal>
        </>
    )
}
