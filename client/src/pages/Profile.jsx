import React, { Fragment, useEffect, useState } from 'react';
import './profile.css';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import { Paper } from '@mui/material';
import Navbar from '../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import ProfileHeader from '../components/Profile/ProfileHeader';
import PhoneAuth from '../components/PhoneAuth/PhoneAuth';

const Profile = () => {
    const [profileVerified, setprofileVerified] = useState(false);
    useEffect(() => {
        if (!localStorage.getItem("localStorageUserId")) {
            setprofileVerified(true);
        } 
      }, [])
  return (
      <Fragment>
          <Navbar />
        <ProfileHeader />

        <Link to="/profile/account" style={{textDecoration: 'none'}}><Paper>
        <div className="profile__options-container">
            <div className="profile__options-tab">
                <div className="profile__tab-container">
                    <div className="profile__options-icon">
                    <PermIdentityIcon />
                    </div>
                    <div className="profile__options-details">
                        <h3 style={{margin:"0"}}>My Account</h3>
                        <h4 style={{margin:"0"}}>Edit your informations</h4>
                    </div>
                </div>
                <div className="profile__options-arrowIcon">
                <ArrowRightAltIcon />
                </div>

            </div>
        </div>
        </Paper></Link>

        <Link to="/profile/purchases" style={{textDecoration: 'none'}}><Paper>
        <div className="profile__options-container">
            <div className="profile__options-tab">
                <div className="profile__tab-container">
                    <div className="profile__options-icon">
                    <ShoppingCartOutlinedIcon />
                    </div>
                    <div className="profile__options-details">
                        <h3 style={{margin:"0"}}>My Purchases</h3>
                        <h4 style={{margin:"0"}}>Purchases</h4>
                    </div>
                </div>
                <div className="profile__options-arrowIcon">
                <ArrowRightAltIcon />
                </div>

            </div>
        </div>
        </Paper></Link>

        <Link to="/profile/partners" style={{textDecoration: 'none'}}><Paper>

        <div className="profile__options-container">
            <div className="profile__options-tab">
                <div className="profile__tab-container">
                    <div className="profile__options-icon">
                    <LoyaltyOutlinedIcon />
                    </div>
                    <div className="profile__options-details">
                        <h3 style={{margin:"0"}}>Loyalty Partners</h3>
                        <h4 style={{margin:"0"}}>Partners</h4>
                    </div>
                </div>
                <div className="profile__options-arrowIcon">
                <ArrowRightAltIcon />
                </div>

            </div>
        </div>
        </Paper></Link>
        { profileVerified &&  <PhoneAuth open={true}/>}
      </Fragment>
  )
}

export default Profile