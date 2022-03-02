import React, { Fragment, useEffect, useState, useContext } from "react";
import Banner from "../components/Banner/Banner";
import Brands from "../components/Brands/Brands";
import Loyalty from "../components/Loyalty/Loyalty";
import TabButton from "../components/TabButton/TabButton";
import { db } from "../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { UserContext } from "../contexts/UserContext";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";


const Home = () => {
const user = useContext(UserContext)
const [partnerFirestoreId, setPartnerFirestoreId] = useState("");
  useEffect(()=> {
    
    console.log("context uuid : ", user);
    console.log("local storage uuid : ",localStorage.getItem("localStorageUserId"));

  },[])

  
  useEffect(() => {
    const getPartner = async () => {
      const partnerCollectionRef = collection( db, "Partners" );

      const q = query(
        partnerCollectionRef,
        where("PartnerPID", "==", "1001")
      );
      const docSnap = await getDocs(q);
        docSnap.forEach((doc) => {
          setPartnerFirestoreId(doc.id);
          console.log("PARTNERID",doc.id)
          localStorage.setItem("partnerFirestoreId", doc.id);
          //Get rest of the Partner details here
        })
      
    };
    getPartner();
  
    return () => {
      
    }
  }, [partnerFirestoreId])
  

  return (
    <Fragment>
      <Navbar />
      <Header title="Zepeat X MoT" />
      <Banner />
      <Loyalty />
      <Brands partnerFirestoreId="VXM509inNCe8tZEBz1RD" />
      <TabButton />
    </Fragment>
  );
};

export default Home;
