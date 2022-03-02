import { Grid } from '@material-ui/core';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from "../../firebase-config";

import Navbar from '../Navbar/Navbar'
import ProfileHeader from './ProfileHeader'
import PurchaseItem from './PurchaseItem'

const MyPurchases = () => {

  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    console.log("My purchases");
    let userId = localStorage.getItem("localStorageUserId");
    const getPurchaseDetails = async () => {
      const purchaseCollectionRef = collection(db, `Customers/${userId}/Checkouts`);
      const q = query(purchaseCollectionRef, where("PartnerPID", "==", "1001"));
      // const q = query(purchaseCollectionRef, where("PartnerPID", "==", "1001"), orderBy("Time","desc"));
      const purchaseQuerySnap = await getDocs(q);
        purchaseQuerySnap.forEach((doc) => {
          console.log(doc.data().PartnerPID)
          setPurchases((prev) => [
            ...prev,
            {
              BrandName:doc.data().BrandName,
              PartnerName: doc.data().PartnerName,
              Amount: doc.data().TotalAmount,
              PaymentStatus: doc.data().PaymentStatus,
              Cart:doc.data().Cart
              // Date: doc.data().Time,
            },

        ]);
          
          console.log("Documents data:", doc.data().Cart);
        })
        console.log("purchases", purchases)
    }
    getPurchaseDetails();
    
  }, [])
  
  return (
    <div>
        <Navbar />
        <ProfileHeader />
        <h2>Purchase History</h2>
        <div className="purchases-container">
          {purchases.map((item, idx) => (
            <Grid item key={idx} xs={12}>
            {
              <PurchaseItem item={item} />
              
            }
          </Grid>
            
          ))}
          
        </div>
    </div>
  )
}

export default MyPurchases