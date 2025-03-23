import React, { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../../State/Authentication/Action';
import { isPresentInFavorites } from '../config/logic';
import { Auth } from '../Auth/Auth';

const RestaurantCard = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };
const navigate = useNavigate()
const dispatch = useDispatch()
const jwt = localStorage.getItem("jwt")
const auth = useSelector(store=>store)

const handleAddToFavorite=()=>{
  dispatch(addToFavorite({ restaurantId: item.id, jwt }));
}

const handleNavigateToRestaurant=()=>{
  if(item.open)
  {
      navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`)
  }
}

  return (
    <Card className="w-[18rem]"> 
        <div className={`${true ? 'cursor-pointer' : "cursor-not-allowed"} relative`}>
        <img className="w-full h-[12rem] rounded-t-md object-cover"
        src={item.images[1]} // Ensure item.images[1] exists
        alt={item.food} /> // Add alt text
        <Chip size="small"
        className="absolute top-2 left-2"
        color={item.open ? "success" : "error"}
        label={item.open ? "open" : "closed"}
        />
        </div>
        <div className='p-4 textPart lg:flex w-full justify-between'>
            <div className='space-y-1'>
              <p onClick={handleNavigateToRestaurant} className='font-semibold text-lg cursor-pointer'>{item.name}</p>
              <p className='text-gray-500 text-sm'>{item.description}</p>
            </div>

            <div>
              <IconButton onClick={handleAddToFavorite}>
                {isPresentInFavorites(auth.favorites,item) ? <FavoriteIcon className="text-red-500"/> : <FavoriteBorderIcon className="text-gray-500"/>}
              </IconButton>
            </div>
        </div>
    </Card>
  )
}

export default RestaurantCard