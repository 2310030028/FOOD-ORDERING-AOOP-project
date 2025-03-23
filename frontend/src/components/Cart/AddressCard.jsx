import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import {Button, Card} from '@mui/material';

export const AddressCard = ({item, showButton, handleSelectAddress}) => {
    return (
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '256px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <HomeIcon/>
                <div style={{ color: '#6b7280', lineHeight: '1.5' }}>
                    <h1 style={{ fontWeight: '600', fontSize: '1.125rem', color: 'white' }}>Home</h1>
                    <p>
                        Vazhraa Nirmaan Vihhari Rd, Sri Laxmi Nagar Colony, Manikonda, Hyderabad,
                        Telangana 500089
                    </p>
                </div>
            </div>
            {showButton && (
                <Button 
                    variant="outlined" 
                    fullWidth 
                    onClick={() => handleSelectAddress(item)} 
                    style={{
                        borderColor: 'rgb(233, 30, 99)',
                        backgroundColor: 'black',
                        color: 'rgb(233, 30, 99)',
                        '&:hover': {
                            color: 'white',
                            backgroundColor: 'rgb(233, 30, 99)',
                        },
                        '&:active': {
                            color: 'white',
                            backgroundColor: 'rgb(233, 30, 99)',
                        },
                    }}
                >
                    Select
                </Button>
            )}
        </Card>
    )
}

export default AddressCard