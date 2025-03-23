import React from 'react'
import {Card} from '@mui/material'
import {Button} from '@mui/material'
export const OrderCard = ({item,order}) => {
  return (
    <Card className="flex justify-between items-center pt-5">

        <div className='flex items-center space-x-5'>
            <img 
            className='h-16 w-16'
            src={item.food.images[0]} alt="" />
        
        <div>
            <p>{item.food.name}</p>
            <p>₹{item.totalPrice}</p>
        </div>
        </div>
        <div>
            <Button variant="contained" className="cursor-not-allow ed">{order.orderStatus}</Button>
        </div>

    </Card>
  )
}
