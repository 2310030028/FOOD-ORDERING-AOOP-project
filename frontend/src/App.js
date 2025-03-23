import {CssBaseline, ThemeProvider} from '@mui/material';
import './App.css';

import {darktheme} from './Theme/DarkTheme';

import {CustomerRoute} from './Routers/CustomerRoute';
import {useEffect} from 'react';
// Update the import path for getUser
import {getUser} from './State/Authentication/Action';
import {useDispatch, useSelector} from 'react-redux';
import { findCart } from './State/Cart/Action';

function App() {
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")
    const {auth} = useSelector(store => store)
    useEffect(() => {
        dispatch(getUser(auth.jwt || jwt))
        dispatch(findCart(jwt))
    }, [auth.jwt])
    return (
        <ThemeProvider theme={darktheme}>
            <CssBaseline/>
            <CustomerRoute/>
        </ThemeProvider>
    );
}

export default App;
