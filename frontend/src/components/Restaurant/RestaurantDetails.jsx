import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Divider, FormControl, FormControlLabel, RadioGroup, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import MenuCard from './MenuCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantsCategory } from '../../State/Restaurant/Action';
import { getMenuItemsByRestaurantId } from '../../State/Menu/Action';


const menu = [1, 1, 1, 1, 1, 1]
const foodTypesOptions = [

    { label: "All", value: "all" },
    { label: "Vegetarian Only", value: "vegetarian" },
    { label: "Non-Vegetarian Only", value: "non_vegetarian" },
    { label: "Seasonal", value: "seasonal" },
]
const RestaurantDetails = () => {
    const [foodType, setFoodType] = React.useState("all")
    const [foodCategory, setFoodCategory] = React.useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")
    const {auth,restaurant,menu} = useSelector(store => store)
    const [selectedCategory,setSelectedCategory]=useState("");
    const {id,city} = useParams();

    const handleFilter = (e) => {
        setFoodType(e.target.value);
        console.log(e.target.value, e.target.name);
    }

    const handleFilterCategory = (e,value)=>
    {
        setSelectedCategory(value)
        console.log(e.target.value,e.target.name,value)

    }

    console.log("restaurant",restaurant)
    useEffect(() => {
        dispatch(getRestaurantById({ jwt, restaurantID: id }))
        dispatch(getRestaurantsCategory({ jwt, restaurantID: id }))
        
    }, [selectedCategory,foodType])

    useEffect(()=>{
        dispatch(getMenuItemsByRestaurantId({ jwt, restaurantID: id, 
        vegetarian: foodType==="vegetarian", 
        nonveg: foodType==="non_vegetarian", 
        seasonal: foodType==="seasonal",foodCategory:selectedCategory }))
    })
    return (
        <div className='px-5 lg:px-20 '>
            <section>
                <h3 className='text-gray-500 py-2 mt-10'>Home/India/Indian Fast Food/3</h3>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <img className='w-full h-[40vh] object-cover'
                                src={restaurant.restaurant?.images[0]} alt="" />

                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img className='w-full h-[40vh] object-cover'
                                src={restaurant.restaurant?.images[1]} alt="" />

                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img className='w-full h-[40vh] object-cover'
                                src={restaurant.restaurant?.images[2]} alt="" />

                        </Grid>
                    </Grid>
                </div>
                <div className='pt-3 pb-5'>
                    <h1 className='text-4xl font-semibold'>{restaurant.restaurant?.name}</h1>
                    <p className='text-gray-500 mt-1'>{restaurant.restaurant?.description}</p>
                    <div className='space-y-3 mt-3'>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <LocationOnIcon />
                            <span>
                                Kondapur, Hyderabad
                            </span>

                        </p>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <CalendarTodayIcon />
                            <span>
                                Mon-Sun: 9:00 AM - 9:00 PM (Today)
                            </span>

                        </p>
                    </div>

                </div>
            </section>
            <Divider />
            <section className='pt=[2rem] lg:flex relative'>
                <div className='space-y-10 lg:w-[20%] filter '>
                    <div className='box space-y-5 lg:sticky top-28 '>
                        <div>
                            <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>
                                Food Types
                            </Typography>
                            <FormControl className='py-10 space-y-5 ' component={"fieldset"}>
                                <RadioGroup onChange={handleFilterCategory} name='food_type' 
                                value={foodType}
                                >
                                    {foodTypesOptions.map((item) => <FormControlLabel
                                        key={item.value}
                                        value={item.value} control={<Radio sx={{ '&.Mui-checked': { color: 'pink' } }} checked={foodType === item.value} />} label={item.label} />)}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Divider />
                        <div>
                            <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>
                                Food Category
                            </Typography>
                            <FormControl className='py-10 space-y-5 ' component={"fieldset"}>
                                <RadioGroup onChange={handleFilter} name='food_category' 
                                value={selectedCategory}
                                >
                                    {restaurant.categories.map((item) => <FormControlLabel
                                        key={item}
                                        value={item.name} control={<Radio sx={{ '&.Mui-checked': { color: 'pink' } }} checked={foodCategory === item} />} label={item.name} />)}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <div className='space-y-5 lg:w-[80%] lg:pl-10'>
                    {menu.menuItems.map((item) => <MenuCard item={item}/>)}
                </div>
            </section>
        </div>
    );
}

export default RestaurantDetails;