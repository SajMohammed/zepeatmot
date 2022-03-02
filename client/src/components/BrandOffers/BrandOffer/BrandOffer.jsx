import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import max from '../../../assets/max.svg';
import './brandoffer.css';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const BrandOffer = ({item}) => {
  return (
    <div className="offers__container">
        <div className="cartitem__container-details">
            <div className="cartitem__container-details_box">
                <h3>{item.name}</h3>
                <p>{item.category}</p>
                <p style={{color:'#20CE88'}}>₹{item.price}</p>
            </div>
            <div className="offer__redeem-container">
                <Button className="redeem-btn" variant="text" style={{backgroundColor:'#20CE88', borderRadius:'8px', width:'130px'}}>REDEEM
                <ArrowRightAltIcon />
                </Button>
            </div>
        </div>
        <div className="cartitem__container-image">
            <img className="cartitem-image" src={max} alt="max protein"/>
        </div>
    </div>
)};

export default BrandOffer;
