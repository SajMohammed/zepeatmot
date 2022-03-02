import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner/Banner";
import BrandOffers from "./components/BrandOffers/BrandOffers";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import Loyalty from "./components/Loyalty/Loyalty";
import Navbar from "./components/Navbar/Navbar";
import TabButton from "./components/TabButton/TabButton";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import PhoneAuth from "./components/PhoneAuth/PhoneAuth";
import { UserContext } from "./contexts/UserContext"
import Profile from "./pages/Profile";
import MyAccount from "./components/Profile/MyAccount";
import MyPurchases from "./components/Profile/MyPurchases";
import LoyaltyPartners from "./components/Profile/LoyaltyPartners";
import ScrollToTop from "./utils/ScrollToTop";
import Preloader from './utils/83548-online-shopping-black-friday.json';
import Lottie from "lottie-react";


function App() {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // localStorage.removeItem("localStorageUserId");
    // localStorage.removeItem("localStorageUsername");
    console.log(localStorage.getItem("localStorageUserId"));
    console.log("from App userId state :",userId);

    setTimeout(()=> {
      setLoading(false);
    }, 3000)
  
  }, [])
  
  const getUserId = (value)=>{
    setUserId(value);
  }

  return (
    <Router>
      <ScrollToTop>
      <div className="App">
        {
          loading ?  <Lottie animationData={Preloader} style={{height:'100vh', width:'100vw'}} />:
        <UserContext.Provider value={userId}>
          <Routes>
            <Route path="/" element={<Home authOpen={true}/>} />
            <Route path="/cart" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/account" element={<MyAccount />} />
            <Route path="/profile/purchases" element={<MyPurchases />} />
            <Route path="/profile/partners" element={<LoyaltyPartners />} />
          </Routes>
        </UserContext.Provider>
        }
      </div>
      </ScrollToTop>
    </Router>
  );
}

export default App;
