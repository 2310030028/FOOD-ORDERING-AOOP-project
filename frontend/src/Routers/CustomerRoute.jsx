import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Profile from '../components/Profile/Profile'
import {Navbar} from '../components/Navbar/Navbar'; // KEEP THIS
import Home from '../components/Home/Home';
import RestaurantDetails from '../components/Restaurant/RestaurantDetails';
import Cart from '../components/Cart/Cart'; // Correct path
import { Auth } from '../components/Auth/Auth';

export const CustomerRoute = () => {
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path='/' element={< Home />}/>
                <Route path='/acount/:register' element={<Home/>}/>
                <Route path='/account/:login' element={<Home/>}/>
                <Route path='/restaurant/:city/:title/:id' element={< RestaurantDetails />} />
                <Route path='/Cart' element={< Cart />}/>
                <Route path='/myprofile/*' element={< Profile />}/>
            </Routes>
            <Auth/>
        </div>
    )
}
