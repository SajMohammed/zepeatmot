import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { db } from "../../../firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { nanoid } from 'nanoid';
import './checkoutBtn.css';

const loadScript = (src) =>{
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
            console.log("loaded");
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script);
	})
}

const date = new Date();

const CheckoutBtn = ({amount, items, handlePaymentSuccess}) => {

    const [userId, setUserId] = useState(localStorage.getItem("localStorageUserId"));
    const [partnerFirestoreIdLS, setPartnerFirestoreIdLS] = useState(localStorage.getItem("partnerFirestoreId"));
    const [brandFirestoreIdLS, setBrandFirestoreIdLS] = useState(localStorage.getItem("brandFirestoreId"));
    let partnerPID;
    let brandBID;
    let partnerName;
    let brandName;
    let customerName;
    let customerPhone;
    let customerUID;

    const handleRazorPay = async (e) => {
        e.preventDefault();
        const id = nanoid(20);
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!res) {
			alert('Razorpay SDK failed to load. Please check your connection?')
			return
		}

        const partnerDocSnap = await getDoc(doc(db, "Partners", partnerFirestoreIdLS));
        if (partnerDocSnap.exists()) {
            console.log("Document data:", partnerDocSnap.data());
            partnerPID = partnerDocSnap.data().PartnerPID
            partnerName = partnerDocSnap.data().PartnerName
            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }

        const brandDocSnap = await getDoc(doc(db, "Partners", partnerFirestoreIdLS, "Brands-MoT", brandFirestoreIdLS));
        if (brandDocSnap.exists()) {
            console.log("Document data:", brandDocSnap.data());
            brandBID = brandDocSnap.data().BrandBID
            brandName = brandDocSnap.data().BrandName
            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }

        const customerDocSnap = await getDoc(doc(db, "Customers", userId));
        if (customerDocSnap.exists()) {
            console.log("Customer Doc data:", customerDocSnap.data());
            customerName = customerDocSnap.data().Name
            customerPhone = customerDocSnap.data().MobNumber
            customerUID = customerDocSnap.data().UID
            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }

        const dbWriteToPartnersCheckout =  async() => {

            console.log("before dbWriteToPartnersCheckout", items)

            await setDoc(doc(db, "Partners", partnerFirestoreIdLS, "Brands-MoT", brandFirestoreIdLS, "Checkouts", id),{
                Cart : items,
                Date: date,
                Name: localStorage.getItem("customerName"),
                SlNo:"00",
                PaymentStatus: "Success",
                PaymentMethod: "Razorpay",
                CustomerUID: userId,
                TotalAmount: Number(localStorage.getItem("totalAmount"))
            })

            console.log("after dbWriteToPartnersCheckout", items)

        }

        const dbWriteToPartnersCheckoutUnsuccessful =  async() => {
            

            await setDoc(doc(db, "Partners", partnerFirestoreIdLS, "Brands-MoT", brandFirestoreIdLS, "Checkouts", id),{
                Cart : items,
                Date: date,
                Name: localStorage.getItem("customerName"),
                SlNo:"00",
                PaymentStatus: "Failed",
                PaymentMethod: "Razorpay",
                CustomerUID:userId,
                TotalAmount: Number(localStorage.getItem("totalAmount"))
            })
            alert("Payment Failed");
        }

        const dbWriteToGlobalCheckoutBrands = async (partnerPID, partnerName) => {
            console.log("before dbWriteToGlobalCheckoutBrands", items)

            await setDoc(doc(db, "Global-Checkouts-Brands","PsZkEJjiRffS0LZxRh53","Customers",id),{
                Cart : items,
                PartnerPID: partnerPID,
                PartnerName:partnerName,
                PaymentStatus: "Success",
                PaymentMethod: "Razorpay",
                UID:userId,
                TotalAmount: Number(localStorage.getItem("totalAmount")),
                CustomerUID:userId,
                CustomerName: localStorage.getItem("customerName")
            })

            console.log("after dbWriteToGlobalCheckoutBrands", items)

        }

        const dbWriteToGlobalCheckoutBrandsUnsuccessful = async (partnerPID, partnerName) => {
            await setDoc(doc(db, "Global-Checkouts-Brands","PsZkEJjiRffS0LZxRh53","Customers",id),{
                Cart : items,
                PartnerPID: partnerPID,
                PartnerName:partnerName,
                PaymentStatus: "Failed",
                PaymentMethod: "Razorpay",
                UID:userId,
                TotalAmount: Number(localStorage.getItem("totalAmount")),
                CustomerUID:userId,
                CustomerName: localStorage.getItem("customerName")
            })
        }

        const dbWriteToCustomersCheckout = async(partnerPID, brandBID, partnerName, brandName) => {

            console.log("before dbWriteToCustomersCheckout", items)


            await setDoc(doc(db, "Customers",userId,"Checkouts",id),{
                Cart : items,
                PartnerPID: partnerPID,
                PartnerName:partnerName,
                PaymentStatus: "Success",
                PaymentMethod: "Razorpay",
                Time: date,
                BrandBID: brandBID,
                BrandName: brandName,
                TotalAmount: Number(localStorage.getItem("totalAmount"))
                
            })

            console.log("after dbWriteToCustomersCheckout", items)

        }

        const dbWriteToCustomersCheckoutUnsuccessful = async(partnerPID, brandBID) => {

            await setDoc(doc(db, "Customers",userId,"Checkouts",id),{
                Cart : items,
                PartnerPID: partnerPID,
                PartnerName:partnerName,
                PaymentStatus: "Failed",
                PaymentMethod: "Razorpay",
                Time: date,
                BrandBID: brandBID,
                BrandName: brandName,
                TotalAmount: Number(localStorage.getItem("totalAmount"))
                
            })
        }

        // const dbWriteToCustomersLoyalty = async() => {
        //     await setDoc(doc(db, "Customers",userId,"Loyalty",id),{
                
        //         PartnerPID: partnerPID,
        //         PartnerName:partnerName,
        //         PaymentStatus: "Failed",
        //         PaymentMethod: "Razorpay",
        //         Time: date,
        //         BrandBID: brandBID,
        //         BrandName: brandName,
        //         TotalAmount: Number(localStorage.getItem("totalAmount"))
                
        //     })
        // }

        const expressData = await fetch('http://159.65.159.39/razorpay', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({amount:amount}) }).then((t) =>
			t.json()
		)
		console.log(expressData)

        if (amount === "") {
            alert("enter amount");
        } else {
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
                key_secret: process.env.REACT_APP_RAZORPAY_SECRET_KEY,
                amount: expressData.amount.toString(), 
                order_id: expressData.id,
                currency: expressData.currency,
                name: "Zepeat",
                description: "your checkout buddy",
                handler: async function (response) {
                    console.log("razorpay_payment_id : ", response.razorpay_payment_id);
                    console.log("razorpay_order_id : ", response.razorpay_order_id);
                    console.log("razorpay_signature : ", response.razorpay_signature);
                    
                    // userId = localStorage.getItem("localStorageUserId");
                    // if (response.razorpay_payment_id) {
                        

                        dbWriteToPartnersCheckout();
                        dbWriteToGlobalCheckoutBrands(partnerPID, partnerName);
                        dbWriteToCustomersCheckout(partnerPID, brandBID, partnerName, brandName);
                        // dbWriteToCustomersLoyalty();
                        handlePaymentSuccess();

                    // } else {
                    //     alert("failed");
                    //     dbWriteToPartnersCheckoutUnsuccessful();
                    // }

                },
                prefill: {
                    name:localStorage.getItem("customerName"),
                    contact: customerPhone,
                    email:"checkouts@zepeat.app"
                },
                theme: {
                    color:"#20CE88"
                }
            };

            const pay = new window.Razorpay(options);
            pay.open();

            pay.on('payment.failed', function (response){
                alert(response.error.code);
                // alert(response.error.description);
                // alert(response.error.source);
                // alert(response.error.step);
                // alert(response.error.reason);
                // alert(response.error.metadata.order_id);
                // alert(response.error.metadata.payment_id);
                console.log("handling fails",partnerPID, brandBID);
                dbWriteToPartnersCheckoutUnsuccessful();
                dbWriteToGlobalCheckoutBrandsUnsuccessful(partnerPID, partnerName);
                dbWriteToCustomersCheckoutUnsuccessful(partnerPID, brandBID, partnerName, brandName);
        })
        }
    }

  return (
    <div className="cart__checkout-button">
        <Button
          className="checkout-btn"
          variant="text"
          onClick={handleRazorPay}
          style={{
            backgroundColor: "#20CE88",
            borderRadius: "8px",
            width: "85VW",
            margin: "10px 10px",
          }} >
          CHECKOUT
          <ArrowRightAltIcon />
        </Button>
      </div>
  )
}

export default CheckoutBtn