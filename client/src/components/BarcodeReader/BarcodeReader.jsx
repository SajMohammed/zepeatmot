import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import PhoneAuth from "../PhoneAuth/PhoneAuth";
import { Button, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';


const BarcodeReader = ({toggleScanner, populateData, handleBarcodeInput}) => {
  const [profileVerified, setprofileVerified] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState("");
    useEffect(() => {
        if (!localStorage.getItem("localStorageUserId")) {
            setprofileVerified(true);
        } 
      }, [])

    const [data, setData] = useState("Data");
    useEffect(() => {
    const html5QrCode = new Html5Qrcode("customReader");
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        //console.log(decodedText, decodedResult);
        setData(decodedText);
        
        html5QrCode.stop()
        .then((ignore) => {
            populateData(decodedText);   // !Important to use the populateData callback here when stop() is called
            toggleScanner(false);
            // QR Code scanning is stopped.
           // console.log(ignore, "Error");
        })
        .catch((err) => {
            // Stop failed, handle it.
        });
    
    };
    const config = { fps: 100, qrbox:{ width: 315, height: 315 }, aspectRatio: 1.777778 };

    // If you want to prefer front camera
    //html5QrCode.start({ facingMode: "user" }, config, qrCodeSuccessCallback);

    // If you want to prefer back camera
    html5QrCode.start(
      { facingMode: "environment" },
      config,
      qrCodeSuccessCallback
    );


    // Select front camera or fail with `OverconstrainedError`.
    //html5QrCode.start({ facingMode: { exact: "user"} }, config, qrCodeSuccessCallback);

    // Select back camera or fail with `OverconstrainedError`.
    //html5QrCode.start({ facingMode: { exact: "environment"} }, config, qrCodeSuccessCallback);
  }, []);

  const handleBarcode = () => {
    console.log(barcodeInput, "clicked");
    handleBarcodeInput(barcodeInput);
    toggleScanner(false);
  }

  return (
    <div className="container" style={{ height: "100vh" }}>
       <CancelIcon fontSize='large' onClick={() => toggleScanner(false)}  style={{ color: "rgb(228 116 116)", zIndex: "2", position: "absolute", marginTop: "4px" }}/>
      <div
        id="customReader"
        // style={{ width:"400px" }}>
        style={{ width:"100vw" }}>
      </div>
      {/* <div
        className="qrData"
        style={{ backgroundColor: "#e2f9f0", color: "#20CE88" }} >
      
        Barcode : {data}    
      </div> */}
      { profileVerified &&  <PhoneAuth open={true}/>}
      <div className="cart__manualbarcode-container" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <form >
              <div>
              <TextField id="outlined-basic" label="or enter barcode here" variant="outlined" onChange={(e) => setBarcodeInput(e.target.value)} style={{marginBottom:"10px"}} />
              <Button variant="contained" onClick={handleBarcode} endIcon={<SearchIcon />} style={{backgroundColor: "#20ce88"}}>
                Search
              </Button>
              
              </div>   
            </form>
          </div>
    </div> 
  );
};

export default BarcodeReader;
