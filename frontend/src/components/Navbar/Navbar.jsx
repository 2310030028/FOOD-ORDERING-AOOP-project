import {Avatar, Badge, IconButton} from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {pink} from '@mui/material/colors';
import './Navbar.css'
import {Box} from '@mui/system'
import PersonIcon from '@mui/icons-material/Person';
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux"
export const Navbar = () => {
    const navigate = useNavigate()
    const {auth,cart} = useSelector(store=>store)
    const handleAvatarClick=()=>{
        if(auth.user?.role==="ROLE_CUSTOMER")
        {
            navigate("/my-profile")
        }
        else
        {
            navigate("/admin/restaurant")
        }
    }
    return (
        <Box
            sx={{
            zIndex: 100
        }}
            className='px-5 sticky top-0 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between items-center'>
            <div className='flex items-center space-x-4'>
                <ul className='flex items-center space-x-4'>
                    {/* Add appropriate class */}
                    <li onClick={()=>navigate('/')}
                    className='logo text-gray-300 text-2xl font-semibold'>
                        Manav Foods
                    </li>
                </ul>
            </div>
            <div className='flex items-center space-x-2 lg:space-x-10'>
                <div className=''>
                    <IconButton>
                        <SearchIcon
                            sx={{
                            fontSize: "1.5rem"
                        }}/>
                    </IconButton>
                </div>
                <div className=''>
                    {auth.user
                        ? <Avatar
                                onClick={handleAvatarClick}
                                sx={{
                                bgcolor: "white",
                                color: pink.A400
                            }}>
                                {auth.user.fullName[0].toUpperCase()}
                            </Avatar>
                        : <IconButton onClick={() => navigate('/account/login')}><PersonIcon/></IconButton>}
                </div>
                <div className=''>
                    <IconButton onClick={()=>navigate('/cart')}>
                        <Badge color='primary' badgeContent={cart.cart?.items.length}>
                            <ShoppingCartIcon
                                sx={{
                                fontSize: "1.5rem"
                            }}/>
                        </Badge>
                    </IconButton>
                </div>
            </div>
        </Box>
    )
}