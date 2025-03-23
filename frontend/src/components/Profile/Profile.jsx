import React, { useState } from 'react'
import { ProfileNavigation } from './ProfileNavigation'
import Orders from './Orders'
import { Routes, Route } from 'react-router-dom'
import UserProfile from './UserProfile'
import Favorites from './Favorites'
import Address from './Address'
import Events from './Events'

const Profile = () => {
    const [openSideBar, setOpenSideBar] = useState(false)
    return (
        <div className='lg:flex justify-between'>
            <div className='sticky h-[80vh] lg:w-[20%]'>
                <ProfileNavigation open={openSideBar}/>
            </div>
            <div className='lg:w-[80%]'>
                <Routes>
                    <Route path='/' element={<UserProfile/>}/>
                    <Route path='/orders' element={<Orders/>}/>
                    <Route path='/Favorites' element={<Favorites/>}/>
                    <Route path='/Address' element={<Address/>}/>
                    <Route path='/Events' element={<Events/>}/>
                    
                </Routes>
            </div>
        </div>
    )
}

export default Profile