import { Card,CardContent,CardMedia, Typography,CardActions,IconButton} from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
export const EventCard = () => {
  return (
    <div>
        <Card sx={{widh:345}}>
            <CardMedia 

            sx = {{height:345}}
            
            image="https://cdn.prod.website-files.com/5a6f337e3f25150001fa6f79/63222947aad97c19638e5cbf_620448c6283ff3b20f5e169a_Blog%2520Thumbnail_2200x1457%2520(63).jpeg"/>
            <CardContent>
                <Typography variant='h5' >
                    Indian 5* Restaurant
                </Typography>
                <Typography variant='body2' >
                    50% off on your first order
                </Typography>
                <div className='py-2 space-y-2 '>
                    <p>{"Mumbai"}</p>
                    <p className='text-sm text-blue-500'>February 14, 2024 12:00 AM</p>
                    <p className='text-sm text-red-500'>February 15, 2024 12:00 AM</p>

                </div>
            </CardContent>
            {false && <CardActions>
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
            </CardActions>}
        </Card>
    </div>
  )
}
