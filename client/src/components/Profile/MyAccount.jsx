import React, { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar'
import ProfileHeader from './ProfileHeader'
import { doc, getDoc } from "firebase/firestore";
import {  db } from '../../firebase-config';

const MyAccount = () => {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    useEffect(() => {
        const customerID = localStorage.getItem("localStorageUserId");
        const getCusotmerData = async () => {
            if( customerID ) {
                
                const customerDocRef = doc(db,`Customers/${customerID}`);
                const docSnap = await getDoc(customerDocRef);
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    setName(docSnap.data().Name);
                    localStorage.setItem("customerName", docSnap.data().Name)
                    setPhone(docSnap.data().MobNumber);
                  } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                  }
            }
        }
        getCusotmerData();
      
    }, [])
  return (
    <div>
        <Navbar />
        <ProfileHeader />
        <div className="account-container" style={{display:'flex', alignItems:"flex-start", flexDirection:'column', padding: "16px 22px"}}>
            <h3>Name : {name}</h3>
            <h3>Phone : {phone}</h3>
            <h3>Email : </h3>
        </div>
    </div>
  )
}

export default MyAccount