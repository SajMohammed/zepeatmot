import { Button } from '@material-ui/core';
import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PhoneAuth from '../PhoneAuth/PhoneAuth';

const TabButton = () => {
  const [profileVerified, setprofileVerified] = useState(false);
  let p = false;
  useEffect(() => {
    if (localStorage.getItem("localStorageUserId")) {
      console.log("local storage is set")
    } else {
      console.log("local storage not set")
      setprofileVerified(true);
    }
  
  }, [profileVerified])

  const handleProfileClick = () => {
    console.log("clicked")
      setprofileVerified(true);
    // if (localStorage.getItem("localStorageUserId")) {
    //   console.log("local storage is set")
    // } else {
    //   console.log("local storage not set")
    //   return <PhoneAuth open={true}/>
    //   p=true;
    // }
    switch (profileVerified) {
      case true:
        return <PhoneAuth open={true}/>;
        break;
      case false:
        return "";
        break;
      default:
        return null;
    }
  }
  
  return (
    <Fragment>

      <div style={{marginTop:'62px', marginBottom:'24px', marginLeft:'15px', marginRight:'15px'}}>
          <Button variant="contained" size="medium" style={{borderRadius:'20px',backgroundColor:'#20CE88',color:'white', padding:'8px 40px'}}>
            Outlet
          </Button>
          <span> </span>
          <Link to="/profile" style={{textDecoration:'none'}}><Button variant="contained" size="medium" onClick={handleProfileClick} style={{borderRadius:'20px', padding:'8px 40px'}}> 
            Profile
          </Button></Link>
      </div>
      { p &&  <PhoneAuth open={true}/>}
      {/* { localStorage.getItem("localStorageUserId") !== null ? "" :  <PhoneAuth open={true}/>} */}
    </Fragment>
  )};

export default TabButton;
