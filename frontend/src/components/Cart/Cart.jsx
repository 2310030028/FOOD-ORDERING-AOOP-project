import React from 'react'
import CartItem from './CartItem'
import Divider from '@mui/material/Divider'
import AddressCard from './AddressCard'
import AddLocationIcon from '@mui/icons-material/AddLocation'
import Card from '@mui/material/Card' 
import Button from '@mui/material/Button' 
import Modal from '@mui/material/Modal' 
import Box from '@mui/material/Box' 
import { ErrorMessage, Formik, Field,Form } from 'formik' 
import * as Yup from 'yup' 
import { TextField, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { createOrder } from '../../State/Order/Action'
export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    outline:"none",
    p: 4,
  };

const initialValues = {
    StreetAddress:"",
    State:"",
    City:"",
    Pincode:"",
    Landmark:"",
}

const validationSchema = Yup.object({
    StreetAddress: Yup.string().required("Street Address is Required"),
    State: Yup.string().required("State is Required"),
    City: Yup.string().required("City is Required"),
    Pincode: Yup.string().required("Pincode is Required"),
    Landmark: Yup.string()
})

const items = [1, 1]
const Cart = () => {
    const createOrderUsingUsingSelectedAddress=()=>{}
    const handleOpenAddressModal=()=>setOpen(true)
    const [open, setOpen] = React.useState(false);
    const {cart, auth} = useSelector(store=>store)
    const dispatch = useDispatch()
    const handleClose = () => setOpen(false);
    const handleSubmit = (values) => {
        const data = {
            jwt: localStorage.getItem("jwt"),
            order: {
              restaurantId: cart.cartItems[0].food?.restaurant.id,
              deliveryAddress: {
                fullName: auth.user?.fullName,
                streetAddress: values.StreetAddress,
                city: values.City,
                state: values.State,
                postalCode: values.Pincode,
                country: "India",
              },
        }
    }
        dispatch(createOrder(data))
        console.log("form values: ",values);
    }

    return (
        <>
            <main className='lg:flex justify-between'>
                <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
                    {cart.cartItems.map((item) => <CartItem item={item}/>)}
                    <Divider/>
                    <div className='BillDetails px-5 text-sm'>
                        <p className='font-extralight py-5'>Bill Details</p>
                        <div className='space-y-3'>
                            <div className='flex justify-between text-gray-400'>
                                <p>Item Total</p>
                                <p>₹{cart.cart?.total}</p>
                            </div>
                            <div className='flex justify-between text-gray-400'>
                                <p>Delivery Fees</p>
                                <p>₹30</p>
                            </div>
                            <div className='flex justify-between text-gray-400'>
                                <p>Platform Fees</p>
                                <p>₹5</p>
                            </div>
                            <div className='flex justify-between text-gray-400'>
                                <p>GST and Restaurant Charges</p>
                                <p>₹50</p>
                            </div>
                            <Divider/>
                        </div>
                        <div className='flex justify-between text-gray-400'>
                            <p>Total Pay</p>
                            <p>₹{cart.cart.total+5+50}</p>
                        </div>
                    </div>
                </section>
                <Divider orientation='vertical' flexItem/>
                <section
                    className='lg:w-[70%] flex justify-center items-start px-5 pb-10 lg:pb-0'>
                    <div>
                        <h1 className='text-center font-semibold text-2xl py-10'>
                            Choose Delivery Address
                        </h1>
                        <div className='flex gap-5 flex-wrap justify-center'>
                            {[1, 1, 1, 1, 1].map((item) => (<AddressCard handleSelectAddress={createOrderUsingUsingSelectedAddress} item={item} showButton={true}/>))}
                            <Card className='flex flex-col gap-5 w-64 p-5'>
                                <div className='flex items-start gap-3'>
                                    <AddLocationIcon/>
                                    <div className='space-y-3 text-gray-500'>
                                        <h1 className='font-semibold text-lg text-white'>Add new Address</h1>
                                        {/* <p>
                                            Vazhraa Nirmaan Vihhari Rd, Sri Laxmi Nagar Colony, Manikonda, Hyderabad,
                                            Telangana 500089
                                        </p> */}
                                    </div>
                                </div>
                                <Button 
                                    variant="outlined" 
                                    fullWidth 
                                    onClick={handleOpenAddressModal} 
                                    style={{ 
                                        backgroundColor: 'black', 
                                        borderColor: 'rgb(233, 30, 99)', 
                                        color: 'rgb(233, 30, 99)',
                                        transition: 'background-color 0.3s, color 0.3s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = 'rgb(233, 30, 99)';
                                        e.target.style.color = 'white';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = 'black';
                                        e.target.style.color = 'rgb(233, 30, 99)';
                                    }}
                                >
                                    Add 
                                </Button>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Formik 
    initialValues={initialValues} 
    validationSchema={validationSchema} 
    onSubmit={handleSubmit}>

        <Form>
           <Grid container spacing={2}>
        <Grid item xs={12}>
            <Field
            as={TextField}
            name="StreetAddress"
            label="Street Address"
            fullWidth
            variant="outlined"
            error={!!<ErrorMessage name="StreetAddress"/>}
            helperText={<ErrorMessage name="StreetAddress">
                {(msg)=><span className='text-red-600'>{msg}</span>}
            </ErrorMessage>}
            />
        </Grid>
        <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
                <InputLabel id="state-label">State</InputLabel>
                <Field
                as={Select}
                name="State"
                labelId="state-label"
                label="State"
                error={!!<ErrorMessage name="State"/>}
                >
                    {["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"].map((state) => (
                        <MenuItem key={state} value={state}>{state}</MenuItem>
                    ))}
                </Field>
                <ErrorMessage name="State">
                    {(msg)=><span className='text-red-600'>{msg}</span>}
                </ErrorMessage>
            </FormControl>
        </Grid>
        <Grid item xs={12}>
            <Field
            as={TextField}
            name="City"
            label="City"
            fullWidth
            variant="outlined"
            error={!!<ErrorMessage name="City"/>}
            helperText={<ErrorMessage name="City">
                {(msg)=><span className='text-red-600'>{msg}</span>}
            </ErrorMessage>}
            />
        </Grid>
        <Grid item xs={12}>
            <Field
            as={TextField}
            name="Pincode"
            label="Pincode"
            fullWidth
            variant="outlined"
            error={!!<ErrorMessage name="Pincode"/>}
            helperText={<ErrorMessage name="Pincode">
                {(msg)=><span className='text-red-600'>{msg}</span>}
            </ErrorMessage>}
            />
        </Grid>
        <Grid item xs={12}>
            <Field
            as={TextField}
            name="Landmark"
            label="Landmark"
            fullWidth
            variant="outlined"
            error={!!<ErrorMessage name="Landmark"/>}
            helperText={<ErrorMessage name="Landmark">
                {(msg)=><span className='text-red-600'>{msg}</span>}
            </ErrorMessage>}
            />
        </Grid>
        <Grid item xs={12}>
            <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth
                style={{ 
                    borderRadius: '0',
                    backgroundColor: 'black', 
                    borderColor: 'rgb(233, 30, 99)', 
                    color: 'rgb(233, 30, 99)',
                    transition: 'background-color 0.3s, color 0.3s'
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgb(233, 30, 99)';
                    e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'black';
                    e.target.style.color = 'rgb(233, 30, 99)';
                }}
            >
                Deliver Here
            </Button>
        </Grid>
    </Grid> 
        </Form>
    
    </Formik>
  </Box>
</Modal>
        </>
    )
}

export default Cart