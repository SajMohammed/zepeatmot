import React from 'react';
import BarcodeIcon from '../../assets/BarcodeIcon.svg';

const Scanner = ({toggleScanner}) => {
  return (
    <div className="scanner__container" onClick = {() => {toggleScanner(true)}} style={{backgroundColor:'#e2f9f0', margin:'20px 30px', padding:'16px 0px', borderRadius:'32px'}}>
        <div className="scanner__barcode">
            <img src={BarcodeIcon} alt="Barcode Icon" />
        </div>
        <h5 style={{margin:0, color:'#20CE88'}}>Scan New Product</h5>
    </div>
  
  )};

export default Scanner;
