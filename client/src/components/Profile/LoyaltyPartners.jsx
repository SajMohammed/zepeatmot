import React from 'react'
import Navbar from '../Navbar/Navbar'
import LoyaltyPartner from './LoyaltyPartner'
import ProfileHeader from './ProfileHeader'

const LoyaltyPartners = () => {
  return (
    <div>
        <Navbar />
        <ProfileHeader />
        <div className="loyaltypartners-container">
            <LoyaltyPartner />
        </div>
    </div>
  )
}

export default LoyaltyPartners