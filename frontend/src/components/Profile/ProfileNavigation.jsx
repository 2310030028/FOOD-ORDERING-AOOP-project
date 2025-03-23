import React, { use } from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { Drawer, useMediaQuery, Divider } from '@mui/material'; // Corrected import statement
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../State/Authentication/Action';

const menu=[
  {
    title:"Orders",
    icon:<ShoppingBagIcon className="h-5 w-5"/>,
  },
  {
    title:"Favorites",
    icon:<FavoriteIcon className="h-5 w-5"/>,
  },
  {
    title:"Address",
    icon:<AddReactionIcon className="h-5 w-5"/>,
  },
  {
    title:"Payments",
    icon:<AccountBalanceWalletIcon className="h-5 w-5"/>,
  },
  {
    title:"Notifications",
    icon:<NotificationsActiveIcon className="h-5 w-5"/>,
  },
  {
    title:"Events",
    icon:<EventIcon className="h-5 w-5"/>,
  },
  {
    title:"Logout",
    icon:<LogoutIcon className="h-5 w-5"/>,
  },
]
export const ProfileNavigation = ({open,handleClose}) => {
  const isSmallScreen = useMediaQuery('(max-width:900px)'); // Corrected media query string
  const navigate=useNavigate();
  const dispatch = useDispatch()
  const handleNavigate=(item)=>{
    if(item.title==="Logout")
    {
      dispatch(logout())
      navigate('/')
    }
    else
    navigate(`/myprofile/${item.title.toLowerCase()}`)
  };
  
  return (
    <div>
      <Drawer 
      variant={isSmallScreen?'temporary':"permanent"}
      onClose={handleClose} 
      open={isSmallScreen?open:true} 
      anchor='left' 
      sx={{zIndex:-1,position:'sticky'}}

      >
        <div className='w-[50vw] h-[100vh] lg:w-[20vw] flex flex-col justify-center text-xl gap-8 pt-16'>
          {menu.map((item, i)=><React.Fragment key={i}> {/* Added key to the mapped elements */}
          <div onClick={()=>handleNavigate(item)} className='px-5 flex items-center space-x-5 cursor-pointer'>
            {item.icon}
            <span>
              {item.title}
            </span>
          </div>
          {i!==menu.length-1 && <Divider/>}
          </React.Fragment>)}
        </div>
      </Drawer>
    </div>
  )
}
