import React, { useState } from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import max from '../../../assets/max.svg';
import './cartitem.css';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({item, handleToggleCart, getQuantity, setIsQuantityChanged}) => {
    
    const [quantity, setQuantity] = useState(1);
    const handleQuantityIncrement = () => {
        setIsQuantityChanged((prev) => (prev+1));
        getQuantity(quantity + 1, item.id);
        setQuantity(quantity + 1);
        
    }
    const handleQuantityDecrement = () => {
        if (quantity > 1 ){
            setIsQuantityChanged((prev) => (prev-1));
            getQuantity(quantity - 1, item.id);
            setQuantity(quantity - 1);
        }
    }
  return (
    <div className="cartitem__container">
        <div className="cartitem__container-details">
            <div className="cartitem__container-details_box">
                <h3 >{item.Name}</h3>
                <p>{item.Category}</p>
                <p style={{color:'#20CE88'}}>₹{item.SellingPrice}</p>
            </div>
            <div className="cartitem__btngroup">
                <ButtonGroup  size="small" variant="contained" aria-label="outlined primary button group" style={{boxShadow:'none', height:'38px'}}>
                    <Button size="small" style={{backgroundColor:'#F5F5F5', border:'none'}} onClick={handleQuantityDecrement}>-</Button>
                    <span style={{backgroundColor:'#F5F5F5',border:'none',display:'flex',alignItems:'center', justifyContent:'center'}}>{quantity}</span>
                    <Button style={{backgroundColor:'#F5F5F5', border:'none'}} onClick={handleQuantityIncrement}>+</Button>
                </ButtonGroup>
                <DeleteIcon fontSize="small" onClick={() => handleToggleCart(item)} style={{ backgroundColor:'#F5F5F5', height:'38px', width:'32px', color:'red'}}/>
            </div>
        </div>
        <div className="cartitem__container-image">
            <img className="cartitem-image" src={max} alt="max protein"/>
        </div>
    </div>
)};

export default CartItem;
