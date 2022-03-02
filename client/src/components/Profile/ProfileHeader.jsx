import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import {  db } from '../../firebase-config';
import profileImage from '../../assets/profileImage.svg';

const ProfileHeader = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("")

    useEffect(() => {
        const customerID = localStorage.getItem("localStorageUserId");
        const getCusotmerData = async () => {
            if( customerID ) {
                
                const customerDocRef = doc(db,`Customers/${customerID}`);
                const docSnap = await getDoc(customerDocRef);
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    setName(docSnap.data().Name);
                    setEmail(docSnap.data().MobNumber);
                  } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                  }
            }
        }
        getCusotmerData();
      
    }, [])
    
  return (
    <div className="profile__header-container">
      <div className="profile__image">
        <img src={profileImage} alt="Profile Image" />
      </div>
      <div className="profile__info">
        <h2>{name}</h2>
        <h4>{email}</h4>
      </div>
    </div>
  );
};

export default ProfileHeader;
