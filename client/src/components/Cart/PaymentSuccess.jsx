import React, { useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentSuccess = () => {
    useEffect(() => {
      toast.success("Thank you for using Zepeat!"); 
    }, [])
    
    let date = new Date();
    let cDay = date.getDate();
    let cMonth = date.getMonth() + 1;
    let cYear = date.getFullYear();
    let currentDate = cDay + "/" + cMonth + "/" + cYear;
    let currentTime = date.getHours() + ":" + date.getMinutes();
  return (
    <div className="paymentSuccess__container" style={{color:"#20CE88", margin:"32px 32px"}}>
        <h3 className="paymentDate">{currentDate}</h3>
        <h3 className="paymentTime">{currentTime}</h3>
        <h1 className="successMessage">
            Payment Successful!
        </h1>
        <ToastContainer />
    </div>
  )
}

export default PaymentSuccess