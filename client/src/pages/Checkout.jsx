import React, { Fragment, useState } from 'react';
import Cart from '../components/Cart/Cart';
import Header from '../components/Header/Header';
import Loyalty from '../components/Loyalty/Loyalty';
import Navbar from '../components/Navbar/Navbar';
import TabButton from '../components/TabButton/TabButton';

const Checkout = () => {
  
  return (

    <Fragment>
        <Navbar />
        <Header title="Zepeat X MoT" />
        <div className="brandImage-container" >
          <img src={localStorage.getItem("brandImage")} alt="Brand logo" style={{ maxWidth:"100px", maxHeight:"100px", width:"auto", height:"auto"}}/>
        </div>
        <Loyalty />
        <Cart />
        <TabButton />
    </Fragment>
  
  )};

export default Checkout;
