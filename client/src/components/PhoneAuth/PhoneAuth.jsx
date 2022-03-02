import React, { useState } from "react";
import { BottomSheet, SheetContent } from "react-spring-bottom-sheet";
import TextField from "@mui/material/TextField";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';

// if setting up the CSS is tricky, you can add this to your page somewhere:
// <link rel="stylesheet" href="https://unpkg.com/react-spring-bottom-sheet/dist/style.css" crossorigin="anonymous">
import "react-spring-bottom-sheet/dist/style.css";
import { Button, InputAdornment } from "@mui/material";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
const PhoneAuth = ({ open }) => {

  const [userName, setCustomerName] = useState()
  const [phoneNumberInput, setPhoneNumberInput] = useState();
  const [OTP, setOTP] = useState();
  const [signInOpen, setSignInOpen] = useState(open);
  const [showWelcome, setShowWelcome] = useState(false);

  const date = new Date();
  
  const setUpRecaptcha = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
        defaultCountry: "IN",
      },
      auth
    );
  };

  const onSignInSubmit = (e) => {
    console.log("sign in clicked")
    e.preventDefault();
    setUpRecaptcha();
    // const phoneNumber = getPhoneNumberFromUserInput();
    const phoneNumber = "+91"+ phoneNumberInput;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;

    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log("OTP not sent")
      });
  };

  const onSubmitOTP = (event) => {
    event.preventDefault();
    const code = OTP;
    window.confirmationResult.confirm(code).then((result) => {
  // User signed in successfully.
    const user = result.user;
    console.log(JSON.stringify(user));
    // alert("user is verified");
    setShowWelcome(true);
    localStorage.setItem("localStorageUserId", user.uid);
    localStorage.setItem("localStorageUsername", userName);
    // getUserId(user.uid); to set useContext (callback function to set value)
    //Writing to customer db
    setDoc(doc(db, "Customers",user.uid),{
      Interests: "Shopping",
      LoginTime: date,
      MobNumber: user.phoneNumber,
      Name: userName,
      UID: user.uid
    })
    // setTimeout(()=> {
    //   setSignInOpen(false);

    // },[4000]);

      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }

  const handleOnChangeName = (event) => {
    console.log(event.target.value);
    setCustomerName(event.target.value);
  }

  const handleOnChangeNumber = (event) => {
    console.log(event.target.value);
    setPhoneNumberInput(event.target.value);
  }

  const handleOnChangeOTP = (event) => {
    console.log(event.target.value);
    setOTP(event.target.value);
  }

  const handleModalClose = () => {
    setSignInOpen(false);
  }

  return (
    <>
    {/* <button onClick={() => setSignInOpen(true)}>Open</button> */}
    <BottomSheet open={signInOpen}>
    {/* <BottomSheet open={true}> */}
    {showWelcome ? <div className="bottomsheet__welcomebox" >
      <CloseOutlinedIcon onClick={() => setSignInOpen(false)}  style={{ margin: "0px 20px", padding: "20px 10px" }}/>
        <h1 style={{backgroundColor:"#20CE88", padding:"12px"}}>Hi {userName},</h1>
        <div className="message__container" style={{ margin: "2px 20px", padding: "2px 20px", marginBottom:"30px", marginLeft:"10px", backgroundColor:"#e2f9f0", borderRadius:"15px" }}>
          <h3>Greetings from Zepeat</h3>
          <h3>Enjoy Shopping!</h3>
        </div>
      </div> :
    <div
        className="bottomsheet__container"
        style={{ margin: "20px 20px", padding: "20px 20px" }}
      >
        <CloseOutlinedIcon onClick={() => setSignInOpen(false)}/>
        <h1>confirm your whatsapp number</h1>

        {/* <TextField id="outlined-basic" label="Name" variant="outlined" style={{width:'70vw', marginBottom:"12px"}}/>
        <TextField id="outlined-basic" label="Phone Number" variant="outlined" style={{width:'70vw', marginBottom:"12px"}}/> */}
        <form onSubmit={onSignInSubmit}>
          <div id="sign-in-button"></div>
          <TextField
            id="name-with-icon-textfield"
            label="Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "70vw", marginBottom: "24px" }}
            variant="standard"
            onChange={handleOnChangeName}
          />
          <TextField
            id="phone-with-icon-textfield"
            label="Phone Number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalPhoneOutlinedIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "70vw", marginBottom: "24px" }}
            variant="standard"
            onChange={handleOnChangeNumber}
          />
          <div className="sendOTP__btn">
            <Button
            type="submit"
              id="btn-sendOTP"
              variant="contained"
              style={{
                backgroundColor: "#20CE88",
                color: "black",
                width: "28vw",
              }}
            >
              Send OTP
            </Button>
          </div>
          </form>
          <form onSubmit={onSubmitOTP}>
          <TextField
            id="otp-with-icon-textfield"
            label="Verify OTP"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SmsOutlinedIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "70vw", margin: "24px 12px" }}
            variant="standard"
            onChange={handleOnChangeOTP}
          />
          <div className="submit__btn">
            <Button
            type="submit"
              id="btn-checkout"
              variant="contained"
              style={{
                backgroundColor: "#20CE88",
                color: "black",
                width: "75vw",
              }}
            >
              Sign In
            </Button>
          </div>    
          </form>
    
      </div>
}
    </BottomSheet>
  </>
  )
}

export default PhoneAuth