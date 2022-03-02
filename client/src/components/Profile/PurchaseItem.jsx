import { Card, CardContent } from '@mui/material';
import React, { useEffect } from 'react';
import('./purchaseItem.css');

const PurchaseItem = ({ item }) => {
    useEffect(() => {
      console.log("from purchase Item", item);

    }, [])
    
  return (
    <div className="purchaseItem-container" style={{margin:"10px 10px"}}>
        <Card>
            <CardContent style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 20px"}}>
                <div className="brand-container" style={{display:"flex", alignItems:"flex-start", flexDirection:"column"}}>
                <h3 style={{margin:0}}>{item.BrandName}</h3>
                <h3 style={{margin:0}}>{item.PartnerName}</h3>
                <p>

                    {item.Cart.map((cart) => (
                    <div style={{margin:0,display:"flex", flexDirection:"column", alignItems:"flex-start"}}>
                    {cart.Quantity} x {cart.Name}
                    </div>
                ))}
                
                </p>
                </div>
                <div>
                <p style={{color:"#20CE88", fontWeight:"800"}}>₹ {item.Amount}</p>
                <div className={item.PaymentStatus == "Success"? "paymentStatus-success" : "paymentStatus-failed"} style={{}}>
                    <p style={{margin:0}}>{item.PaymentStatus}</p>
                </div>
                </div>
            </CardContent>
        </Card>
    </div>
    )
}

export default PurchaseItem