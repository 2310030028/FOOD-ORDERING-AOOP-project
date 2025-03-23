import React, { useEffect } from 'react'
import './Home.css'
import MultiItemCarousal from './MultiItemCarousal'
import RestaurantCard from '../Restaurant/RestaurantCard.jsx'
import {Auth} from '../Auth/Auth.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRestaurantsAction } from '../../State/Restaurant/Action.js'
import { useNavigate } from 'react-router-dom'
import { findCart } from '../../State/Cart/Action.js'

const restaurants = [1,1,1,1,1,1,1,1]

const Home = () => {
    const Navigate = useNavigate
    const dispatch =useDispatch()
    const jwt = localStorage.getItem("jwt")
    const {  restaurant } = useSelector(store => store);
    console.log("restaurant",restaurant) // Debug log to check the state
    useEffect(() => {
        dispatch(getAllRestaurantsAction(jwt)); // Use the actual JWT token
      
    }, []);


    
    return (
        <div className='pb-10'>
            <section
                className='banner z-50 relative flex flex-col justify-center items-center'>
                <div className='w-[50vw] z-10 text-center'>
                    <p className='text-2xl lg:text-6xl font-bold z-10 py-5'>Manav Foods</p>
                    <p className='z-10 text-gray-300 text-xl lg:text-4xl'>Taste the Convenience: Food, Fast and Delivered
                    </p>
                </div>
                <div className='cover absolute top-0 left-0 right-0'></div>
                <div className='fadeout'></div>
            </section>
            <section className='p-10 lg:py-10 lg:px-20'>
                <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'>Top Meals</p>
                <MultiItemCarousal/>
            </section>
            <section className='px-5 lg:px-20 pt-10'>
                <h1 className='text-2xl font-semibold text-gray-400 pb-8'>Order From our Handpicked Favourites</h1>
                <div className='flex flex-wrap items-center justify-around gap-4'>
                    {restaurant.restaurants && restaurant.restaurants.length > 0 ? (
                        restaurant.restaurants.map((item) => <RestaurantCard key={item.id} item={item} />)
                    ) : (
                        <p>No restaurants available</p> // Fallback message
                    )}
                </div>
            </section>
            <Auth/>
        </div>
    );
};

export default Home;