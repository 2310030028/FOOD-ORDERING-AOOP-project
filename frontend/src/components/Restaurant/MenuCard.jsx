import React, { useState } from 'react' // Added useState import
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles'; // Import styled from MUI
import { categorizedIngredients } from '../util/CategorizeIngredients'
import { useDispatch } from 'react-redux'; // Fixed import statement
import { addItemToCart } from '../../State/Cart/Action'; // Import addItemToCart

const demo = [
  {
    category: "nuts & seeds",
    ingredients: ["cashews"]
  },
  {
    category: "Proteins",
    ingredients: ["lentils", "Racon Strips"],
  },
]

const PinkCheckbox = styled(Checkbox)({
  color: 'pink',
  '&.Mui-checked': {
    color: 'pink',
  },
});

const MenuCard = ({ item }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const dispatch = useDispatch();
  const handleCheckBoxChange = (itemName) => {
    console.log("value",itemName);
    if (selectedIngredients.includes(itemName)) {
      setSelectedIngredients(selectedIngredients.filter((item) => item !== itemName));
    } else {
      setSelectedIngredients([...selectedIngredients, itemName]); // Fixed the state update
    }
  };

  const handleAddItemToCart = (e) => { 
    e.preventDefault()
    const reqData = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        FoodId: item.id,
        quantity: 1,
        ingredients: selectedIngredients,
      },
    };
    dispatch(addItemToCart(reqData))
    console.log("requested data",reqData)
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className='lg:flex items-center justify-between'>
          <div className='lg:flex items-center lg:gap-5'>
            <img className='w-[7rem] h-[7rem] object-cover'
              src={item.images[0]}
              alt="" />
            <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
              <p className='font-semibold text-xl'>{item.name}</p>
              <p>₹{item.price}</p> {/* Corrected 'prince' to 'price' */}
              <p className='text-gray-400'>{item.description}</p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleAddItemToCart}>
          <div className='flex gap-5 flex-wrap'>
            {
              Object.keys(categorizedIngredients(item.ingredients)).map((category, index) =>
                <div key={index}>
                  <p>{category}</p>
                  <FormGroup>
                    {categorizedIngredients(item.ingredients)[category].map((item) => // Changed 'item' to 'item'
                      <FormControlLabel key={item.id} control={<PinkCheckbox onChange={() => handleCheckBoxChange(item.name)} />} label={item} />)} {/* Changed 'item.name' to 'item' */}
                  </FormGroup>
                </div>
              )}
          </div>
          <div className='pt-5'>
            <Button  variant='contained' disabled={false} type='submit' style={{ backgroundColor: '#ff6666' }}>{true ? "Add to Cart" : "Out of Stock"}</Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  )
}

export default MenuCard