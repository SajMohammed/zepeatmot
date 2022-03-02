import React, { useState, useEffect } from 'react';
import { AppBar, Badge, Toolbar, Typography } from '@material-ui/core';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Avatar from '@mui/material/Avatar';
import { green } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showAvatar, setShowAvatar] = useState(localStorage.getItem("localStorageUsername")  ? true : false)
  let initialVal = localStorage.getItem("localStorageUsername");
  const [initial, setInitial] = useState(initialVal ? initialVal.charAt(0) : "");

  useEffect(() => {
    console.log("Initial",initialVal)
  
    
  }, [])
  
  return (
    <div>
        <AppBar position="relative" color="inherit">
            <Toolbar style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Link to="/" style={{textDecoration:'none'}}><KeyboardBackspaceIcon style={{color:"black"}}/></Link>
            <div className="navbar__avatarbadge-container" style={{display:'flex', alignItems:'center', gap:'10px'}}>

            { showAvatar && <Avatar sx={{bgcolor:green[300]}}>{initial}</Avatar >}
            <Badge color="secondary" badgeContent={0} showZero>
                <ShoppingCartOutlinedIcon />
          </Badge>
            </div>
            </Toolbar>
        </AppBar>
    </div>
  )
};

export default Navbar;
